/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector, useStore } from 'react-redux'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import {
  submitJoinGroup,
  submitCreateGroup,
  submitGetGroup,
  submitLeaveGroup,
} from 'views/group/groupActions'
import GroupMembersList from 'views/group/components/GroupMembersList'
import SignedGamesList from 'views/group/components/SignedGamesList'
import sleep from 'utils/sleep'
import config from 'config'
import { submitSignup } from 'views/signup/signupActions'
import type { GroupMember } from 'flow/group.flow'
import type { StatelessFunctionalComponent } from 'react'

/*
type State = {
  loading: boolean,
  showCreateGroup: boolean,
  showJoinGroup: boolean,
  joinGroupValue: string,
  message: string,
  messageStyle: string,
}
*/

const GroupView: StatelessFunctionalComponent<{}> = () => {
  const username: string = useSelector(state => state.login.username)
  const serial: string = useSelector(state => state.login.serial)
  const groupCode: string = useSelector(state => state.login.playerGroup)
  const groupMembers: $ReadOnlyArray<GroupMember> = useSelector(
    state => state.login.groupMembers
  )
  const dispatch = useDispatch()
  const store = useStore()
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(true)
  const [showCreateGroup, setShowCreateGroup] = React.useState(false)
  const [showJoinGroup, setShowJoinGroup] = React.useState(false)
  const [joinGroupValue, setJoinGroupValue] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [messageStyle, setMessageStyle] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(store)

      // Get group members if user is in a group
      if (groupCode !== '0') {
        await dispatch(submitGetGroup(groupCode))
      }
    }
    fetchData()
    setLoading(false)
  }, [])

  const openGroupForming = () => {
    setShowCreateGroup(true)
    setShowJoinGroup(false)
  }

  const openJoinGroup = () => {
    setShowJoinGroup(true)
    setShowCreateGroup(false)
  }

  const createGroup = async () => {
    const groupData = {
      username: username,
      groupCode: serial,
      leader: true,
      ownSerial: serial,
    }
    const response = await dispatch(submitCreateGroup(groupData))
    if (response.status === 'success') {
      showMessage({ message: t('groupCreated'), style: response.status })
    } else if (response.status === 'error') {
      showMessage({
        message: t('generalCreateGroupError'),
        style: response.status,
      })
    }
  }

  // Remove all signups
  const removeSignups = async () => {
    const signupData = {
      username,
      selectedGames: [],
    }

    await dispatch(submitSignup(signupData))
  }

  const joinGroup = async () => {
    const groupData = {
      username: username,
      groupCode: joinGroupValue,
      leader: false,
      ownSerial: serial,
    }

    const response = await dispatch(submitJoinGroup(groupData))

    if (response.status === 'success') {
      showMessage({ message: t('groupJoined'), style: response.status })
      await removeSignups()
    } else if (response.status === 'error') {
      if (response.code === 31) {
        showMessage({
          message: t('invalidGroupCode'),
          style: response.status,
        })
      } else if (response.code === 32) {
        showMessage({
          message: t('groupNotExist'),
          style: response.status,
        })
      } else {
        showMessage({
          message: t('generalCreateGroupError'),
          style: response.status,
        })
      }
    }
  }

  const leaveGroup = async ({ leader }) => {
    const groupData = {
      username: username,
      groupCode: groupCode,
      leader,
      ownSerial: serial,
      leaveGroup: true,
    }
    const response = await dispatch(submitLeaveGroup(groupData))

    if (response.status === 'success') {
      showMessage({ message: t('leftGroup'), style: response.status })
    } else if (response.status === 'error') {
      if (response.code === 36) {
        showMessage({
          message: t('groupNotEmpty'),
          style: response.status,
        })
      } else {
        showMessage({
          message: t('generalLeaveGroupError'),
          style: response.status,
        })
      }
    }
  }

  const handleJoinGroupChange = event => {
    setJoinGroupValue(event.target.value)
  }

  const isGroupLeader = () => {
    if (groupCode === serial) {
      return true
    }
    return false
  }

  const isInGroup = () => {
    if (groupCode && groupCode !== '0') {
      return true
    }
    return false
  }

  const showMessage = async ({ message, style }) => {
    setMessage(message)
    setMessageStyle(style)
    await sleep(config.MESSAGE_DELAY)
    setMessage('')
    setMessageStyle('')
  }

  const groupLeader = isGroupLeader()
  const inGroup = isInGroup()

  const joinGroupInput = (
    <div>
      <input
        key='joinGroup'
        className='form-input'
        placeholder={t('enterGroupLeaderCode')}
        value={joinGroupValue}
        onChange={handleJoinGroupChange}
      />
    </div>
  )

  return (
    <div className='group-view'>
      <p className='page-title'>{t('pages.group')}</p>
      <p>{t('groupSignupGuide')}</p>

      {loading && <Loading />}
      {!loading && !groupLeader && !inGroup && (
        <React.Fragment>
          <button
            className={showCreateGroup ? 'active' : ''}
            onClick={() => openGroupForming()}
          >
            {t('button.createGroup')}
          </button>
          <button
            className={showJoinGroup ? 'active' : ''}
            onClick={() => openJoinGroup()}
          >
            {t('button.joinGroup')}
          </button>

          {showCreateGroup && (
            <div>
              <p>{t('createGroupConfirmationMessage')}</p>
              <p>{t('groupLeaderWargnin')}</p>
              <button onClick={() => createGroup()}>
                {t('button.joinGroupConfirmation')}
              </button>
            </div>
          )}

          {showJoinGroup && (
            <div>
              <p>{t('joiningGroupWillCancelGames')}</p>

              {joinGroupInput}
              <button onClick={() => joinGroup()}>
                {t('button.joinGroup')}
              </button>
            </div>
          )}
        </React.Fragment>
      )}
      {!loading && groupLeader && inGroup && (
        <React.Fragment>
          <p>
            {t('youAreGroupLeader')}. {t('groupLeaderInfo')}.
          </p>
          <p>{t('groupMembers')}</p>
          <GroupMembersList groupMembers={groupMembers} />
          <p>{t('signedGames')}</p>
          <SignedGamesList groupMembers={groupMembers} />
          <button onClick={() => leaveGroup({ leader: true })}>
            {t('button.leaveGroup')}
          </button>
        </React.Fragment>
      )}
      {!loading && !groupLeader && inGroup && (
        <React.Fragment>
          <p>
            {t('youAreInGroup')}. {t('groupMemberInfo')}.
          </p>
          <p>{t('groupMembers')}</p>
          <GroupMembersList groupMembers={groupMembers} />
          <p>{t('signedGames')}</p>
          <SignedGamesList groupMembers={groupMembers} />
          <button onClick={() => leaveGroup({ leader: false })}>
            {t('button.leaveGroup')}
          </button>
        </React.Fragment>
      )}
      <p className={messageStyle}>{message}</p>
    </div>
  )
}

export default GroupView

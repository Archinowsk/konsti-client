/* @flow */
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  submitJoinGroup,
  submitCreateGroup,
  submitLeaveGroup,
} from 'views/group/groupActions'
import { GroupMembersList } from 'views/group/components/GroupMembersList'
import { SignedMembersList } from 'views/group/components/SignedMembersList'
import { sleep } from 'utils/sleep'
import { config } from 'config'
import { submitSignup } from 'views/signup/signupActions'
import { loadGroupMembers } from 'utils/loadData'
import type { GroupMember } from 'flow/group.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const GroupView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const username: string = useSelector(state => state.login.username)
  const serial: string = useSelector(state => state.login.serial)
  const groupCode: string = useSelector(state => state.login.groupCode)
  const groupMembers: $ReadOnlyArray<GroupMember> = useSelector(
    state => state.login.groupMembers
  )
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [showCreateGroup, setShowCreateGroup] = React.useState(false)
  ;(showCreateGroup: boolean)

  const [showJoinGroup, setShowJoinGroup] = React.useState(false)
  ;(showJoinGroup: boolean)

  const [joinGroupValue, setJoinGroupValue] = React.useState('')
  ;(joinGroupValue: string)

  const [message, setMessage] = React.useState('')
  ;(message: string)

  const [messageStyle, setMessageStyle] = React.useState('')
  ;(messageStyle: string)

  const store = useStore()

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      await loadGroupMembers(store)
    }
    fetchData()
  }, [store])

  const openGroupForming = () => {
    setShowCreateGroup(true)
    setShowJoinGroup(false)
  }

  const openJoinGroup = () => {
    setShowJoinGroup(true)
    setShowCreateGroup(false)
  }

  const createGroup = async (): Promise<any> => {
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
  const removeSignups = async (): Promise<any> => {
    const signupData = {
      username,
      selectedGames: [],
    }

    await dispatch(submitSignup(signupData))
  }

  const joinGroup = async (): Promise<any> => {
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

  const leaveGroup = async ({ leader }): Promise<any> => {
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

  const showMessage = async ({ message, style }): Promise<any> => {
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
      <h2>{t('pages.group')}</h2>
      <p>{t('groupSignupGuide')}</p>

      {!groupLeader && !inGroup && (
        <Fragment>
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
        </Fragment>
      )}
      {groupLeader && inGroup && (
        <Fragment>
          <p>
            {t('youAreGroupLeader')}. {t('groupLeaderInfo')}.
          </p>
          <p>{t('groupMembers')}</p>
          <GroupMembersList groupMembers={groupMembers} />
          <p>{t('signedGames')}</p>
          <SignedMembersList groupMembers={groupMembers} />
          <button onClick={() => leaveGroup({ leader: true })}>
            {t('button.leaveGroup')}
          </button>
        </Fragment>
      )}
      {!groupLeader && inGroup && (
        <Fragment>
          <p>
            {t('youAreInGroup')}. {t('groupMemberInfo')}.
          </p>
          <p>{t('groupMembers')}</p>
          <GroupMembersList groupMembers={groupMembers} />
          <p>{t('signedGames')}</p>
          <SignedMembersList groupMembers={groupMembers} />
          <button onClick={() => leaveGroup({ leader: false })}>
            {t('button.leaveGroup')}
          </button>
        </Fragment>
      )}
      <p className={messageStyle}>{message}</p>
    </div>
  )
}

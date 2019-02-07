/* @flow */
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { getData } from 'utils/store'
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

type Props = {
  t: Function,
  username: string,
  serial: string,
  onSubmitCreateGroup: Function,
  onSubmitJoinGroup: Function,
  onSubmitGetGroup: Function,
  onSubmitLeaveGroup: Function,
  groupCode: string,
  groupMembers: Array<Object>,
  onSubmitSignup: Function,
  signedGames: Array<Object>,
}

type State = {
  loading: boolean,
  showCreateGroup: boolean,
  showJoinGroup: boolean,
  joinGroupValue: string,
  message: string,
  messageStyle: string,
}

class GroupView extends React.Component<Props, State> {
  state = {
    loading: true,
    showCreateGroup: false,
    showJoinGroup: false,
    joinGroupValue: '',
    message: '',
    messageStyle: '',
  }

  componentDidMount = async () => {
    const { onSubmitGetGroup, groupCode } = this.props
    await getData()

    // Get group members if user is in a group
    if (groupCode !== '0') {
      await onSubmitGetGroup(groupCode)
    }
    this.setState({ loading: false })
  }

  openGroupForming = () => {
    this.setState({ showCreateGroup: true, showJoinGroup: false })
  }

  openJoinGroup = () => {
    this.setState({ showJoinGroup: true, showCreateGroup: false })
  }

  createGroup = async () => {
    const { username, serial, onSubmitCreateGroup, t } = this.props
    const groupData = {
      username: username,
      groupCode: serial,
      leader: true,
      ownSerial: serial,
    }
    const response = await onSubmitCreateGroup(groupData)
    if (response.status === 'success') {
      this.showMessage({ message: t('groupCreated'), style: response.status })
    } else if (response.status === 'error') {
      this.showMessage({
        message: t('generalCreateGroupError'),
        style: response.status,
      })
    }
  }

  // Remove al signups
  removeSignups = async () => {
    const { onSubmitSignup, username, signedGames } = this.props

    const startTimes = []

    signedGames.forEach(signedGame => {
      startTimes.push(signedGame.time)
    })

    const sortedTimes = [...new Set(startTimes)].sort()

    // Remove signups from all startTimes
    for (let time of sortedTimes) {
      const signupData = {
        username,
        selectedGames: [],
        time: time,
      }

      await onSubmitSignup(signupData)
    }
  }

  joinGroup = async () => {
    const { username, serial, onSubmitJoinGroup, t } = this.props
    const { joinGroupValue } = this.state
    const groupData = {
      username: username,
      groupCode: joinGroupValue,
      leader: false,
      ownSerial: serial,
    }

    const response = await onSubmitJoinGroup(groupData)

    if (response.status === 'success') {
      this.showMessage({ message: t('groupJoined'), style: response.status })
      await this.removeSignups()
    } else if (response.status === 'error') {
      if (response.code === 31) {
        this.showMessage({
          message: t('invalidGroupCode'),
          style: response.status,
        })
      } else if (response.code === 32) {
        this.showMessage({
          message: t('groupNotExist'),
          style: response.status,
        })
      } else {
        this.showMessage({
          message: t('generalCreateGroupError'),
          style: response.status,
        })
      }
    }
  }

  leaveGroup = async ({ leader }) => {
    const { onSubmitLeaveGroup, username, serial, groupCode, t } = this.props
    const groupData = {
      username: username,
      groupCode: groupCode,
      leader,
      ownSerial: serial,
      leaveGroup: true,
    }
    const response = await onSubmitLeaveGroup(groupData)

    if (response.status === 'success') {
      this.showMessage({ message: t('leftGroup'), style: response.status })
    } else if (response.status === 'error') {
      if (response.code === 36) {
        this.showMessage({
          message: t('groupNotEmpty'),
          style: response.status,
        })
      } else {
        this.showMessage({
          message: t('generalLeaveGroupError'),
          style: response.status,
        })
      }
    }
  }

  handleJoinGroupChange = event => {
    this.setState({ joinGroupValue: event.target.value })
  }

  // Check if user is group leader
  isGroupLeader = () => {
    const { groupCode, serial } = this.props
    if (groupCode === serial) {
      return true
    }
    return false
  }

  // Check if user is in leader
  isInGroup = () => {
    const { groupCode } = this.props
    if (groupCode && groupCode !== '0') {
      return true
    }
    return false
  }

  showMessage = async ({ message, style }) => {
    this.setState({ message, messageStyle: style })
    await sleep(config.MESSAGE_DELAY)
    this.setState({ message: '', messageStyle: '' })
  }

  render() {
    const { t, groupMembers } = this.props
    const {
      loading,
      showCreateGroup,
      showJoinGroup,
      joinGroupValue,
      message,
      messageStyle,
    } = this.state

    const groupLeader = this.isGroupLeader()
    const inGroup = this.isInGroup()

    const joinGroupInput = (
      <div>
        <input
          key='joinGroup'
          className='form-input'
          placeholder={t('enterGroupLeaderCode')}
          value={joinGroupValue}
          onChange={this.handleJoinGroupChange}
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
              onClick={() => this.openGroupForming()}
            >
              {t('button.createGroup')}
            </button>
            <button
              className={showJoinGroup ? 'active' : ''}
              onClick={() => this.openJoinGroup()}
            >
              {t('button.joinGroup')}
            </button>

            {showCreateGroup && (
              <div>
                <p>{t('createGroupConfirmationMessage')}</p>
                <p>{t('groupLeaderWargnin')}</p>
                <button onClick={() => this.createGroup()}>
                  {t('button.joinGroupConfirmation')}
                </button>
              </div>
            )}

            {showJoinGroup && (
              <div>
                <p>{t('joiningGroupWillCancelGames')}</p>

                {joinGroupInput}
                <button onClick={() => this.joinGroup()}>
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
            <button onClick={() => this.leaveGroup({ leader: true })}>
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
            <button onClick={() => this.leaveGroup({ leader: false })}>
              {t('button.leaveGroup')}
            </button>
          </React.Fragment>
        )}
        <p className={messageStyle}>{message}</p>
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => {
  return {
    username: state.login.username,
    serial: state.login.serial,
    groupCode: state.login.playerGroup,
    groupMembers: state.login.groupMembers,
    signedGames: state.myGames.signedGames,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitCreateGroup: groupData => dispatch(submitCreateGroup(groupData)),
    onSubmitJoinGroup: groupData => dispatch(submitJoinGroup(groupData)),
    onSubmitGetGroup: groupCode => dispatch(submitGetGroup(groupCode)),
    onSubmitLeaveGroup: groupData => dispatch(submitLeaveGroup(groupData)),
    onSubmitSignup: signupData => dispatch(submitSignup(signupData)),
  }
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupView)
)

/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
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
}

type State = {
  loading: boolean,
  showCreateGroup: boolean,
  showJoinGroup: boolean,
  joinGroupValue: string,
}

class GroupView extends React.Component<Props, State> {
  state = {
    loading: true,
    showCreateGroup: false,
    showJoinGroup: false,
    joinGroupValue: '',
  }

  componentDidMount = async () => {
    const { onSubmitGetGroup, groupCode } = this.props
    await getData()
    await onSubmitGetGroup(groupCode)
    this.setState({ loading: false })
  }

  openGroupForming = () => {
    this.setState({ showCreateGroup: true, showJoinGroup: false })
  }

  openJoinGroup = () => {
    this.setState({ showJoinGroup: true, showCreateGroup: false })
  }

  createGroup = async () => {
    const { username, serial, onSubmitCreateGroup } = this.props
    const groupData = {
      username: username,
      groupCode: serial,
      leader: true,
      ownSerial: serial,
    }
    await onSubmitCreateGroup(groupData)
  }

  joinGroup = async () => {
    const { username, serial, onSubmitJoinGroup } = this.props
    const { joinGroupValue } = this.state
    const groupData = {
      username: username,
      groupCode: joinGroupValue,
      leader: false,
      ownSerial: serial,
    }

    await onSubmitJoinGroup(groupData)
  }

  leaveGroup = async ({ leader }) => {
    const { onSubmitLeaveGroup, username, serial, groupCode } = this.props
    const groupData = {
      username: username,
      groupCode: groupCode,
      leader,
      ownSerial: serial,
      leaveGroup: true,
    }
    await onSubmitLeaveGroup(groupData)
  }

  handleJoinGroupChange = event => {
    this.setState({ joinGroupValue: event.target.value })
  }

  // Check if user is group leader
  isGroupLeader = () => {
    const { groupCode, serial } = this.props
    if (groupCode.toString() === serial.toString()) {
      return true
    }
    return false
  }

  // Check if user is in leader
  isInGroup = () => {
    const { groupCode } = this.props
    if (groupCode) {
      return true
    }
    return false
  }

  render() {
    const { t, groupMembers } = this.props
    const {
      loading,
      showCreateGroup,
      showJoinGroup,
      joinGroupValue,
    } = this.state

    const groupLeader = this.isGroupLeader()
    const inGroup = this.isInGroup()

    const joinGroupInput = (
      <div>
        <p>{t('joinGroup')} </p>
        <input
          key="joinGroup"
          className="form-input"
          placeholder={t('enterGroupLeaderCode')}
          value={joinGroupValue}
          onChange={this.handleJoinGroupChange}
        />
      </div>
    )

    return (
      <div className="group-view">
        <p className="page-title">{t('pages.group')}</p>

        {loading && <Loading />}
        {!loading &&
          !groupLeader &&
          !inGroup && (
            <React.Fragment>
              <p>{t('joiningGroupWillCancelGames')}</p>
              <button onClick={() => this.openGroupForming()}>
                {t('button.createGroup')}
              </button>
              <button onClick={() => this.openJoinGroup()}>
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
                  {joinGroupInput}
                  <button onClick={() => this.joinGroup()}>
                    {t('button.joinGroup')}
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
        {!loading &&
          groupLeader &&
          inGroup && (
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
        {!loading &&
          !groupLeader &&
          inGroup && (
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
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitCreateGroup: groupData => dispatch(submitCreateGroup(groupData)),
    onSubmitJoinGroup: groupData => dispatch(submitJoinGroup(groupData)),
    onSubmitGetGroup: groupData => dispatch(submitGetGroup(groupData)),
    onSubmitLeaveGroup: groupData => dispatch(submitLeaveGroup(groupData)),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupView)
)

/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { getData } from 'utils/store'
import Loading from 'components/Loading'
import { submitJoinGroup, submitCreateGroup } from 'views/group/groupActions'

type Props = {
  t: Function,
  username: string,
  serial: string,
  onSubmitCreateGroup: Function,
  onSubmitJoinGroup: Function,
  // group: string,
}

type State = {
  loading: boolean,
  showAddMember: boolean,
  showJoinGroup: boolean,
  joinGroupValue: string,
}

class GroupView extends React.Component<Props, State> {
  state = {
    loading: true,
    showAddMember: false,
    showJoinGroup: false,
    joinGroupValue: '',
  }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  openGroupForming = () => {
    this.setState({ showAddMember: true, showJoinGroup: false })
  }

  openJoinGroup = () => {
    this.setState({ showJoinGroup: true, showAddMember: false })
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

  handleJoinGroupChange = event => {
    this.setState({ joinGroupValue: event.target.value })
  }

  render() {
    const { t } = this.props
    const { loading, showAddMember, showJoinGroup, joinGroupValue } = this.state

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
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <p className="page-title">{t('pages.group')}</p>
            <button onClick={() => this.openGroupForming()}>
              {t('button.createGroup')}
            </button>
            <button onClick={() => this.openJoinGroup()}>
              {t('button.joinGroup')}
            </button>

            {showAddMember && (
              <div>
                <p>{t('createGroupConfirmationMessage')}</p>
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
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => {
  return {
    username: state.login.username,
    serial: state.login.serial,
    group: state.login.playerGroup,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitCreateGroup: groupData => dispatch(submitCreateGroup(groupData)),
    onSubmitJoinGroup: groupData => dispatch(submitJoinGroup(groupData)),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupView)
)

/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { getData } from 'utils/store'
import Loading from 'components/Loading'
import { submitJoinGroup, submitAddMember } from 'views/group/groupActions'

type Props = {
  t: Function,
  username: string,
}

type State = {
  loading: boolean,
  showAddMember: boolean,
  showJoinGroup: boolean,
  newMemberValue: string,
  joinGroupValue: string,
}

class GroupView extends React.Component<Props, State> {
  state = {
    loading: true,
    showAddMember: false,
    showJoinGroup: false,
    newMemberValue: '',
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

  addMember = async () => {
    const { username } = this.props
    const { newMemberValue } = this.state
    const groupData = { username: username, groupCode: newMemberValue }
    await submitAddMember(groupData)
  }

  joinGroup = async () => {
    const { username } = this.props
    const { joinGroupValue } = this.state
    const groupData = { username: username, groupCode: joinGroupValue }
    await submitJoinGroup(groupData)
  }

  handleJoinGroupChange = event => {
    this.setState({ joinGroupValue: event.target.value })
  }

  handleNewMemberChange = event => {
    this.setState({ newMemberValue: event.target.value })
  }

  render() {
    const { t } = this.props
    const {
      loading,
      showAddMember,
      showJoinGroup,
      joinGroupValue,
      newMemberValue,
    } = this.state

    const addMemberInput = (
      <div>
        <p>{t('addGroupMember')} </p>

        <input
          key="addGroupMember"
          className="form-input"
          placeholder={t('enterGroupMemberCode')}
          value={newMemberValue}
          onChange={this.handleNewMemberChange}
        />
      </div>
    )

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
                {addMemberInput}
                <button onClick={() => this.addMember()}>
                  {t('button.addMember')}
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
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {}
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupView)
)

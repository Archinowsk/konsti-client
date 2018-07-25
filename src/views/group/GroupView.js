/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { getData } from 'utils/store'
import Loading from 'components/Loading'

type Props = {
  t: Function,
}

type State = {
  loading: boolean,
  showAddMember: boolean,
  showJoinGroup: boolean,
}

class GroupView extends React.Component<Props, State> {
  state = { loading: true, showAddMember: false, showJoinGroup: false }

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

  addMember = () => {
    console.log('add member')
  }

  joinGroup = () => {
    console.log('join group')
  }

  render() {
    const { t } = this.props
    const { loading, showAddMember, showJoinGroup } = this.state

    const AddMemberInput = () => {
      const { t } = this.props

      return (
        <div>
          <p>{t('addGroupMember')} </p>

          <input
            className="form-input"
            // {...input}
            placeholder={t('enterGroupMemberCode')}
            // type={type}
            // id={input.name}
          />
        </div>
      )
    }

    const JoinGroupInput = () => {
      const { t } = this.props

      return (
        <div>
          <p>{t('joinGroup')} </p>
          <input
            className="form-input"
            // {...input}
            placeholder={t('enterGroupLeaderCode')}
            // type={type}
            // id={input.name}
          />
        </div>
      )
    }

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
                <AddMemberInput />
                <button onClick={() => this.addMember()}>
                  {t('button.addMember')}
                </button>
              </div>
            )}

            {showJoinGroup && (
              <div>
                <JoinGroupInput />
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
  return {}
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

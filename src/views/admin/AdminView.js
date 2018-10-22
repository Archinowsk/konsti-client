/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import Blacklist from 'views/admin/components/Blacklist'
import {
  submitGamesUpdate,
  submitPlayersAssign,
  submitSignupTime,
} from 'views/admin/adminActions'
import { submitSelectDate } from 'views/signup/signupActions'
import TimesDropdown from 'components/TimesDropdown'
import { getData } from 'utils/store'
import Loading from 'components/Loading'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  onSubmitGamesUpdate: Function,
  onSubmitPlayersAssign: Function,
  t: Function,
  updateResponse: Object,
  games: Array<any>,
  blacklistedGames: Array<any>,
  onSubmitSelectDate: Function,
  onSubmitSignupTime: Function,
  date: string,
  signupTime: string,
}

type State = {
  submitting: boolean,
  loading: boolean,
  message: string,
  messageStyle: string,
}

class AdminView extends React.Component<Props, State> {
  state = {
    submitting: false,
    loading: true,
    message: '',
    messageStyle: '',
  }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  // Get games that are not blacklisted
  getVisibleGames = () => {
    const { games, blacklistedGames } = this.props

    const visibleGames = []
    // Remove hidden games
    for (let i = 0; i < games.length; i += 1) {
      let match = false

      for (let j = 0; j < blacklistedGames.length; j += 1) {
        if (games[i].id === blacklistedGames[j].id) {
          match = true
          break
        }
      }
      if (!match) {
        visibleGames.push(games[i])
      }
    }

    return visibleGames
  }

  // Assign game info to blacklisted games list
  fillBlacklistedGameinfo = () => {
    const { games, blacklistedGames } = this.props
    games.forEach(game => {
      blacklistedGames.forEach(blacklistedGame => {
        if (game.id === blacklistedGame.id) {
          Object.assign(blacklistedGame, game)
        }
      })
    })
  }

  submitUpdate = async () => {
    const { onSubmitGamesUpdate } = this.props
    this.setState({ submitting: true })
    try {
      await onSubmitGamesUpdate()
    } catch (error) {
      console.log(`onSubmitGamesUpdate error: ${error}`)
    }
    this.setState({ submitting: false })
  }

  submitAssign = async () => {
    const { onSubmitPlayersAssign, signupTime } = this.props
    this.setState({ submitting: true })

    let response = null
    try {
      response = await onSubmitPlayersAssign(signupTime)
    } catch (error) {
      console.log(`onSubmitPlayersAssign error: ${error}`)
    }
    this.setState({ submitting: false })

    if (response && response.status === 'success') {
      this.showMessage({
        message: response.results.message,
        style: response.status,
      })
    } else if (response && response.status === 'error') {
      this.showMessage({
        message: 'Error assigning players',
        style: response.status,
      })
    }
  }

  showMessage = async ({ message, style }) => {
    this.setState({ message, messageStyle: style })
  }

  submitTime = async () => {
    const { onSubmitSignupTime, date } = this.props
    this.setState({ submitting: true })
    try {
      await onSubmitSignupTime(date)
    } catch (error) {
      console.log(`onSubmitSignupTime error: ${error}`)
    }
    this.setState({ submitting: false })
  }

  render() {
    const {
      t,
      updateResponse,
      blacklistedGames,
      onSubmitSelectDate,
      date,
      signupTime,
    } = this.props

    const { submitting, loading, message, messageStyle } = this.state

    const visibleGames = this.getVisibleGames()
    this.fillBlacklistedGameinfo()
    const formattedDate = timeFormatter.weekdayAndTime(signupTime)

    return (
      <div className="admin-view">
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <button
              disabled={submitting}
              onClick={() => {
                this.submitUpdate()
              }}
            >
              {t('button.updateDb')}
            </button>

            <button
              disabled={submitting}
              onClick={() => {
                this.submitAssign()
              }}
            >
              {t('button.assignPlayers')}
            </button>

            {submitting && <p>{t('loading')}</p>}

            <p className={messageStyle}>{message}</p>

            {updateResponse.data.errors && (
              <p className="error">{updateResponse.data.message}</p>
            )}

            <p>{t('selectOpenSignup')}</p>

            <p>
              {t('signupOpen')} {formattedDate}
            </p>

            <button
              disabled={submitting}
              onClick={() => {
                this.submitTime()
              }}
            >
              {t('button.saveTime')}
            </button>

            <TimesDropdown
              games={visibleGames}
              onChange={onSubmitSelectDate}
              date={date}
              signupTime={signupTime}
            />

            <Blacklist blacklistedGames={blacklistedGames} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    updateResponse: state.admin.updateResponse,
    games: state.allGames.games,
    blacklistedGames: state.admin.blacklistedGames,
    date: state.signup.date,
    signupTime: state.admin.signupTime,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitGamesUpdate: () => dispatch(submitGamesUpdate()),
    onSubmitPlayersAssign: signupTime =>
      dispatch(submitPlayersAssign(signupTime)),
    onSubmitSelectDate: event => dispatch(submitSelectDate(event.target.value)),
    onSubmitSignupTime: date => dispatch(submitSignupTime(date)),
  }
}

export default withNamespaces()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminView)
)

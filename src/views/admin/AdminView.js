/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
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
}

class AdminView extends React.Component<Props, State> {
  state = {
    submitting: false,
    loading: true,
  }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  render() {
    const {
      onSubmitGamesUpdate,
      onSubmitPlayersAssign,
      t,
      updateResponse,
      games,
      blacklistedGames,
      onSubmitSelectDate,
      onSubmitSignupTime,
      date,
      signupTime,
    } = this.props

    const { submitting, loading } = this.state

    // Assign game info to blacklisted games list
    games.forEach(game => {
      blacklistedGames.forEach(blacklistedGame => {
        if (game.id === blacklistedGame.id) {
          Object.assign(blacklistedGame, game)
        }
      })
    })

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

    const submitUpdate = async () => {
      this.setState({ submitting: true })

      try {
        await onSubmitGamesUpdate()
        this.setState({ submitting: false })
      } catch (error) {
        console.log(`onSubmitGamesUpdate error: ${error}`)
      }
    }

    const submitAssign = async () => {
      this.setState({ submitting: true })

      try {
        await onSubmitPlayersAssign(signupTime)
      } catch (error) {
        console.log(`onSubmitPlayersAssign error: ${error}`)
      }

      this.setState({ submitting: false })
    }

    const submitTime = async () => {
      this.setState({ submitting: true })

      try {
        await onSubmitSignupTime(date)
      } catch (error) {
        console.log(`onSubmitSignupTime error: ${error}`)
      }

      this.setState({ submitting: false })
    }

    const formattedDate = timeFormatter.weekdayAndTime(signupTime)

    return (
      <div className="admin-view">
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
            <button
              disabled={submitting}
              onClick={() => {
                submitUpdate()
              }}
            >
              {t('button.updateDb')}
            </button>

            <button
              disabled={submitting}
              onClick={() => {
                submitAssign()
              }}
            >
              {t('button.assignPlayers')}
            </button>

            {submitting && <p>{t('loading')}</p>}

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
                submitTime()
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

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminView)
)

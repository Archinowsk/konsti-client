import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import moment from 'moment'

import Blacklist from './components/Blacklist'
import {
  submitGamesUpdate,
  submitPlayersAssign,
  submitGetSettings,
  submitSignupTime,
} from './adminActions'
import { submitGetGames } from '../all-games/allGamesActions'
import { submitSelectDate } from '../signup/signupActions'
import TimesDropdown from '../../components/TimesDropdown'

class AdminView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitting: false,
    }
  }

  componentDidMount() {
    /*
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    */
    this.props.onSubmitGetGames()
    this.props.onSubmitGetSettings()
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

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

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
        console.log(error)
      }
    }

    const submitAssign = async () => {
      this.setState({ submitting: true })

      try {
        await onSubmitPlayersAssign(signupTime)
        this.setState({ submitting: false })
      } catch (error) {
        console.log(error)
      }
    }

    const submitTime = async () => {
      this.setState({ submitting: true })

      try {
        await onSubmitSignupTime(date)
        this.setState({ submitting: false })
      } catch (error) {
        console.log(error)
      }
    }

    // submitSelectDate(signupTime);
    const formattedDate = moment.utc(signupTime).format('DD.M.YYYY HH:mm')

    return (
      <div>
        <button
          disabled={this.state.submitting}
          onClick={() => {
            submitUpdate()
          }}
        >
          {t('button.updateDb')}
        </button>

        <button
          disabled={this.state.submitting}
          onClick={() => {
            submitAssign()
          }}
        >
          {t('button.assignPlayers')}
        </button>

        {this.state.submitting && <p>{t('loading')}</p>}

        {updateResponse.data.errors && (
          <p className="error">{updateResponse.data.message}</p>
        )}

        <p>{t('selectOpenSignup')}</p>

        <p>
          {t('signupOpen')} {formattedDate}
        </p>

        <button
          disabled={this.state.submitting}
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
      </div>
    )
  }
}

AdminView.propTypes = {
  onSubmitGamesUpdate: PropTypes.func.isRequired,
  onSubmitPlayersAssign: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateResponse: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
  onSubmitGetSettings: PropTypes.func.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
  onSubmitSelectDate: PropTypes.func.isRequired,
  onSubmitSignupTime: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  signupTime: PropTypes.string.isRequired,
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

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGamesUpdate: () => dispatch(submitGamesUpdate()),
    onSubmitPlayersAssign: signupTime =>
      dispatch(submitPlayersAssign(signupTime)),
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
    onSubmitSelectDate: event => dispatch(submitSelectDate(event.target.value)),
    onSubmitSignupTime: date => dispatch(submitSignupTime(date)),
  }
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AdminView)
)

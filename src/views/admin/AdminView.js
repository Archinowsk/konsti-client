/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import moment from 'moment'

import Blacklist from 'views/admin/components/Blacklist'
import {
  submitGamesUpdate,
  submitPlayersAssign,
  submitGetSettings,
  submitSignupTime,
} from 'views/admin/adminActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitSelectDate } from 'views/signup/signupActions'
import TimesDropdown from 'components/TimesDropdown'

type Props = {
  onSubmitGamesUpdate: Function,
  onSubmitPlayersAssign: Function,
  t: Function,
  updateResponse: Object,
  games: Array<any>,
  onSubmitGetGames: Function,
  onSubmitGetSettings: Function,
  blacklistedGames: Array<any>,
  onSubmitSelectDate: Function,
  onSubmitSignupTime: Function,
  date: string,
  signupTime: string,
}

type State = {
  submitting: boolean,
}

class AdminView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      submitting: false,
    }
  }

  props: Props

  componentDidMount() {
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

    const formattedDate = moment(signupTime).format('DD.M.YYYY HH:mm')

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
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
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

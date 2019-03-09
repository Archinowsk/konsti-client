/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
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

const AdminView = (props: Props, state: State) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [message, setMessage] = React.useState('')
  const [messageStyle, setMessageStyle] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
    setLoading(false)
  }, [])

  // Get games that are not blacklisted
  const getVisibleGames = () => {
    const { games, blacklistedGames } = props

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
  const fillBlacklistedGameinfo = () => {
    const { games, blacklistedGames } = props
    games.forEach(game => {
      blacklistedGames.forEach(blacklistedGame => {
        if (game.id === blacklistedGame.id) {
          Object.assign(blacklistedGame, game)
        }
      })
    })
  }

  const submitUpdate = async () => {
    const { onSubmitGamesUpdate } = props
    setSubmitting(true)
    try {
      await onSubmitGamesUpdate()
    } catch (error) {
      console.log(`onSubmitGamesUpdate error: ${error}`)
    }
    setSubmitting(false)
  }

  const submitAssign = async () => {
    const { onSubmitPlayersAssign, signupTime } = props
    setSubmitting(true)

    let response = null
    try {
      response = await onSubmitPlayersAssign(signupTime)
    } catch (error) {
      console.log(`onSubmitPlayersAssign error: ${error}`)
    }
    setSubmitting(false)

    if (response && response.status === 'success') {
      showMessage({
        message: response.results.message,
        style: response.status,
      })
    } else if (response && response.status === 'error') {
      showMessage({
        message: 'Error assigning players',
        style: response.status,
      })
    }
  }

  const showMessage = async ({ message, style }) => {
    setMessage(message)
    setMessageStyle(style)
  }

  const submitTime = async () => {
    const { onSubmitSignupTime, date } = props
    setSubmitting(true)
    try {
      await onSubmitSignupTime(date)
    } catch (error) {
      console.log(`onSubmitSignupTime error: ${error}`)
    }
    setSubmitting(false)
  }

  const {
    t,
    updateResponse,
    blacklistedGames,
    onSubmitSelectDate,
    date,
    signupTime,
  } = props

  const visibleGames = getVisibleGames()
  fillBlacklistedGameinfo()
  const formattedDate = timeFormatter.weekdayAndTime(signupTime)

  return (
    <div className='admin-view'>
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

          <p className={messageStyle}>{message}</p>

          {updateResponse.data.errors && (
            <p className='error'>{updateResponse.data.message}</p>
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

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminView)
)

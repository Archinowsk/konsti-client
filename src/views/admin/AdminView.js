/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Hidden from 'views/admin/components/Hidden'
import {
  submitGamesUpdate,
  submitPlayersAssign,
  submitSignupTime,
} from 'views/admin/adminActions'
import { submitSelectDate } from 'views/signup/signupActions'
import TimesDropdown from 'components/TimesDropdown'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'

type Props = {
  hiddenGames: Array<any>,
  date: string,
  games: Array<Game>,
  onSubmitGamesUpdate: Function,
  onSubmitPlayersAssign: Function,
  onSubmitSelectDate: Function,
  onSubmitSignupTime: Function,
  signupTime: string,
  updateResponse: Object,
}

type State = {
  submitting: boolean,
  loading: boolean,
  message: string,
  messageStyle: string,
}

const AdminView = (props: Props, state: State) => {
  const {
    hiddenGames,
    date,
    games,
    onSubmitGamesUpdate,
    onSubmitPlayersAssign,
    onSubmitSelectDate,
    onSubmitSignupTime,
    signupTime,
    updateResponse,
  } = props

  const [submitting, setSubmitting] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [message, setMessage] = React.useState('')
  const [messageStyle, setMessageStyle] = React.useState('')

  const { t } = useTranslation()

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(getStore())
    }
    fetchData()
    setLoading(false)
  }, [])

  // Get games that are not hidden
  const getVisibleGames = () => {
    const visibleGames = []
    // Remove hidden games
    for (let i = 0; i < games.length; i += 1) {
      let match = false

      for (let j = 0; j < hiddenGames.length; j += 1) {
        if (games[i].gameId === hiddenGames[j].gameId) {
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

  // Assign game info to hidden games list
  const fillHiddenGameinfo = () => {
    games.map(game => {
      hiddenGames.map(hiddenGame => {
        if (game.gameId === hiddenGame.gameId) {
          Object.assign(hiddenGame, game)
        }
      })
    })
  }

  const submitUpdate = async () => {
    setSubmitting(true)
    try {
      await onSubmitGamesUpdate()
    } catch (error) {
      console.log(`onSubmitGamesUpdate error: ${error}`)
    }
    setSubmitting(false)
  }

  const submitAssign = async () => {
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
    setSubmitting(true)
    try {
      await onSubmitSignupTime(date)
    } catch (error) {
      console.log(`onSubmitSignupTime error: ${error}`)
    }
    setSubmitting(false)
  }

  const visibleGames = getVisibleGames()
  fillHiddenGameinfo()
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

          <Hidden hiddenGames={hiddenGames} />
        </React.Fragment>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    updateResponse: state.admin.updateResponse,
    games: state.allGames.games,
    hiddenGames: state.admin.hiddenGames,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView)

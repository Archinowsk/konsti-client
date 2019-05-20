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
import TimesDropdown from 'components/TimesDropdown'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  hiddenGames: Array<Game>,
  games: Array<Game>,
  onSubmitGamesUpdate: Function,
  onSubmitPlayersAssign: Function,
  onSubmitSignupTime: Function,
  signupTime: string,
  updateResponse: Object,
}

/*
type State = {
  submitting: boolean,
  loading: boolean,
  message: string,
  messageStyle: string,
  selectedSignupTime: string,
}
*/

const AdminView: StatelessFunctionalComponent<Props> = (props: Props) => {
  const {
    hiddenGames,
    games,
    onSubmitGamesUpdate,
    onSubmitPlayersAssign,
    onSubmitSignupTime,
    signupTime,
    updateResponse,
  } = props

  const [submitting, setSubmitting] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [message, setMessage] = React.useState('')
  const [messageStyle, setMessageStyle] = React.useState('')
  const [selectedSignupTime, setSelectedSignupTime] = React.useState('')

  const { t } = useTranslation()

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(getStore())
    }
    fetchData()
    setLoading(false)
  }, [])

  const showMessage = async ({ message, style }) => {
    setMessage(message)
    setMessageStyle(style)
  }

  const getStartingTimes = () => {
    // Don't include hidden games
    const visibleGames = []
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

    const startTimes = []
    visibleGames.forEach(game => {
      startTimes.push(game.startTime)
    })

    return [...new Set(startTimes)].sort()
  }

  const submitUpdate = async () => {
    setSubmitting(true)
    try {
      await onSubmitGamesUpdate()
    } catch (error) {
      console.log(`onSubmitGamesUpdate error:`, error)
    }
    setSubmitting(false)
  }

  const submitAssign = async () => {
    setSubmitting(true)

    let response = null
    try {
      response = await onSubmitPlayersAssign(signupTime)
    } catch (error) {
      console.log(`onSubmitPlayersAssign error:`, error)
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

  const submitTime = async () => {
    setSubmitting(true)
    try {
      await onSubmitSignupTime(selectedSignupTime)
    } catch (error) {
      console.log(`onSubmitSignupTime error:`, error)
    }
    setSubmitting(false)
  }

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
            {t('signupOpen')} {timeFormatter.weekdayAndTime(signupTime)}
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
            times={getStartingTimes()}
            selectedTime={selectedSignupTime}
            onChange={event => setSelectedSignupTime(event.target.value)}
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
    signupTime: state.admin.signupTime,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitGamesUpdate: () => dispatch(submitGamesUpdate()),
    onSubmitPlayersAssign: signupTime =>
      dispatch(submitPlayersAssign(signupTime)),
    onSubmitSignupTime: signupTime => dispatch(submitSignupTime(signupTime)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView)

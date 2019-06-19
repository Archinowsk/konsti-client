/* @flow */
import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Hidden } from 'views/admin/components/Hidden'
import {
  submitGamesUpdate,
  submitPlayersAssign,
  submitSignupTime,
} from 'views/admin/adminActions'
import { TimesDropdown } from 'components/TimesDropdown'
import { loadData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import { timeFormatter } from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

export const AdminView: StatelessFunctionalComponent<{}> = () => {
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const signupTime: string = useSelector(state => state.admin.signupTime)
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  )
  const updateResponse: Object = useSelector(
    state => state.admin.updateResponse
  )
  const dispatch = useDispatch()
  const store = useStore()
  const { t } = useTranslation()

  const [submitting, setSubmitting]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = React.useState(false)
  const [loading, setLoading]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = React.useState(true)
  const [message, setMessage]: [
    string,
    ((string => string) | string) => void
  ] = React.useState('')
  const [messageStyle, setMessageStyle]: [
    string,
    ((string => string) | string) => void
  ] = React.useState('')
  const [selectedSignupTime, setSelectedSignupTime]: [
    string,
    ((string => string) | string) => void
  ] = React.useState('')

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(store)
    }
    fetchData()
    setLoading(false)
  }, [])

  const showMessage = async ({ message, style }) => {
    setMessage(message)
    setMessageStyle(style)
  }

  const getVisibleGames = () => {
    if (!hiddenGames) return games
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
    return visibleGames
  }

  const getStartingTimes = () => {
    const visibleGames = getVisibleGames()
    const startTimes = visibleGames.map(game => game.startTime)
    return [...new Set(startTimes)].sort()
  }

  const submitUpdate = async () => {
    setSubmitting(true)
    try {
      await dispatch(submitGamesUpdate())
    } catch (error) {
      console.log(`onSubmitGamesUpdate error:`, error)
    }
    setSubmitting(false)
  }

  const submitAssign = async () => {
    setSubmitting(true)

    let response = null
    try {
      response = await dispatch(submitPlayersAssign(signupTime))
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
      await dispatch(submitSignupTime(selectedSignupTime))
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

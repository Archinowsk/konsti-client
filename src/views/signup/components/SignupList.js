/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect, useSelector, useStore } from 'react-redux'
import timeFormatter from 'utils/timeFormatter'
import {
  submitSignup,
  submitSelectedGames,
  submitSignupTime,
} from 'views/signup/signupActions'
import DragAndDropList from 'views/signup/components/DragAndDropList'
import sleep from 'utils/sleep'
import config from 'config'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import type { StatelessFunctionalComponent } from 'react'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

type Props = {
  games: $ReadOnlyArray<Game>,
  submitSelectedGames: Function,
  submitSignup: Function,
  signupTimes: $ReadOnlyArray<string>,
  submitSignupTime: Function,
}

/*
type State = {
  submitting: boolean,
  signupSubmitted: boolean,
  signupError: boolean,
  signupTime: string,
}
*/

const SignupList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const {
    games,
    submitSelectedGames,
    submitSignup,
    signupTimes,
    submitSignupTime,
  } = props

  const signupTime: string = useSelector(state => state.signup.signupTime)
  const username: string = useSelector(state => state.login.username)
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  )
  const signedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.signedGames
  )
  const selectedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.signup.selectedGames
  )
  const store = useStore()
  const { t } = useTranslation()

  const [submitting, setSubmitting] = React.useState(false)
  const [signupSubmitted, setSignupSubmitted] = React.useState(false)
  const [signupError, setSignupError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      await loadData(store)
    }
    fetchData()
    submitSelectedGames(signedGames)
    setLoading(false)
  }, [])

  // Submit signup
  const onSubmitClick = async () => {
    setSubmitting(true)

    const signupData = {
      username,
      selectedGames,
    }

    let response = null
    try {
      response = await submitSignup(signupData)
    } catch (error) {
      console.log(`onSubmitSignup error: `, error)
    }

    if (response && response.status === 'success') {
      showMessage('signupSubmitted')
    } else if (response && response.status === 'error') {
      showMessage('signupError')
    }
    setSubmitting(false)
  }

  // Cancel signup
  const onCancelClick = async () => {
    setSubmitting(true)

    const gamesWithDifferentTime = selectedGames.filter(selectedGame => {
      if (selectedGame.time !== signupTime) {
        return selectedGame
      }
    })

    const signupData = {
      username,
      selectedGames: gamesWithDifferentTime,
    }

    let response = null
    try {
      response = await submitSignup(signupData)
    } catch (error) {
      console.log(`onSubmitSignup error: `, error)
    }

    if (response && response.status === 'success') {
      showMessage('signupSubmitted')
    } else if (response && response.status === 'error') {
      showMessage('signupError')
      setSignupError(true)
    }
    setSubmitting(false)
  }

  // Get games that have signup open and are not hidden
  const filterGames = () => {
    // Remove hidden games
    const visibleGames = []
    for (let game of games) {
      let match = false
      for (let hiddenGame of hiddenGames) {
        if (game.gameId === hiddenGame.gameId) {
          match = true
          break
        }
      }
      if (!match) {
        visibleGames.push(game)
      }
    }

    // Get games for current signup time
    const filteredGames = []
    visibleGames.forEach(game => {
      if (game.startTime === signupTime) {
        filteredGames.push(game)
      }
    })

    return filteredGames
  }

  // Callback from child component
  const updateSelectedGames = newGames => {
    // Combine new selected games to existing games
    const existingGames = selectedGames.filter(
      selectedGame => selectedGame.gameDetails.startTime !== signupTime
    )
    const combined = existingGames.concat(newGames)
    submitSelectedGames(combined)
  }

  // Select signup time from buttons and store it
  const selectSignupTime = signupTime => {
    submitSignupTime(signupTime)
  }

  const showMessage = async message => {
    if (message === 'signupSubmitted') {
      setSignupSubmitted(true)
    } else if (message === 'signupError') {
      setSignupError(true)
    }
    await sleep(config.MESSAGE_DELAY)
    setSignupSubmitted(false)
    setSignupError(false)
  }

  const filteredGames = filterGames()

  const { signupStartTime } = timeFormatter.startTime(signupTime)
  const { signupEndTime } = timeFormatter.endTime(signupTime, '')

  const isActive = isActive => (isActive ? 'active' : '')

  const signupTimeButtons = signupTimes.map(time => {
    return (
      <button
        key={time}
        onClick={() => selectSignupTime(time)}
        className={`button-${time} ${isActive(time === signupTime)}`}
        disabled={time === signupTime}
      >
        {timeFormatter.weekdayAndTime(time)}
      </button>
    )
  })

  return (
    <div className='signup-list'>
      {loading && <Loading />}

      {!loading && signupTimes.length === 0 && (
        <p className='page-title'>{t('noOpenSignups')}</p>
      )}

      {!loading && signupTimes.length !== 0 && (
        <React.Fragment>
          <p className='page-title'>{t('signupOpen')}:</p>
          <div>{signupTimeButtons}</div>
        </React.Fragment>
      )}

      {!loading && filteredGames.length !== 0 && (
        <React.Fragment>
          <p>
            {t('signupOpenBetweenCapital')} {signupStartTime}-{signupEndTime}.{' '}
            {t('signupResultHint')} {signupEndTime}
          </p>
          <p>{t('signupGuide')}</p>

          <div>
            <button disabled={submitting} onClick={onSubmitClick}>
              {t('button.signup')}
            </button>
            <button disabled={submitting} onClick={onCancelClick}>
              {t('button.cancelSignup')}
            </button>
            {signupSubmitted && (
              <span className='success'>{t('signupSaved')}</span>
            )}
            {signupError && <span className='error'>{t('signupFailed')}</span>}
          </div>
          <DragAndDropList
            games={filteredGames}
            signupTime={signupTime}
            callback={updateSelectedGames}
            selectedGames={selectedGames}
            signedGames={signedGames}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default connect(
  null,
  { submitSelectedGames, submitSignup, submitSignupTime }
)(SignupList)

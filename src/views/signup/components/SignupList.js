/* @flow */
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { timeFormatter } from 'utils/timeFormatter'
import {
  submitSignup,
  submitSelectedGames,
  submitSignupTime,
} from 'views/signup/signupActions'
import { submitGetGamesAsync } from 'views/all-games/allGamesActions'
import { DragAndDropList } from 'views/signup/components/DragAndDropList'
import { sleep } from 'utils/sleep'
import { config } from 'config'
import type { StatelessFunctionalComponent, Element } from 'react'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

type Props = {|
  games: $ReadOnlyArray<Game>,
  signupTimes: $ReadOnlyArray<string>,
|}

export const SignupList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { games, signupTimes } = props

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

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [submitting, setSubmitting] = React.useState(false)
  ;(submitting: boolean)

  const [signupSubmitted, setSignupSubmitted] = React.useState(false)
  ;(signupSubmitted: boolean)

  const [signupError, setSignupError] = React.useState(false)
  ;(signupError: boolean)

  React.useEffect(() => {
    if (selectedGames.length === 0) dispatch(submitSelectedGames(signedGames))
  }, [dispatch, selectedGames.length, signedGames])

  const onSubmitClick = async (): Promise<any> => {
    setSubmitting(true)

    const signupData = {
      username,
      selectedGames,
    }

    let response = null
    try {
      response = await dispatch(submitSignup(signupData))
    } catch (error) {
      console.log(`submitSignup error: `, error)
    }

    if (response && response.status === 'success') {
      showMessage('signupSubmitted')
    } else if (response && response.status === 'error') {
      showMessage('signupError')
    }
    setSubmitting(false)
  }

  const onCancelClick = async (): Promise<any> => {
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

    let signupResponse = null
    try {
      signupResponse = await dispatch(submitSignup(signupData))
    } catch (error) {
      console.log(`submitSignup error: `, error)
    }

    if (signupResponse && signupResponse.status === 'success') {
      showMessage('signupSubmitted')
      dispatch(submitSelectedGames(signupResponse.signedGames))
    } else if (signupResponse && signupResponse.status === 'error') {
      showMessage('signupError')
      setSignupError(true)
    }
    setSubmitting(false)
  }

  // Get games that have are not hidden, have signup open, and are not signed
  const filterAvailableGames = () => {
    const visibleGames = _.differenceBy(games, hiddenGames, 'gameId')

    const selectedGameDetails = selectedGames.map(
      selectedGame => selectedGame.gameDetails
    )

    const nonSelectedGames = _.differenceBy(
      visibleGames,
      selectedGameDetails,
      'gameId'
    )

    return nonSelectedGames.filter(
      nonSelectedGame => nonSelectedGame.startTime === signupTime
    )
  }

  const filterSelectedGames = () => {
    const selectedGameDetails = selectedGames.map(
      selectedGame => selectedGame.gameDetails
    )

    return selectedGameDetails.filter(
      selectedGame => selectedGame.startTime === signupTime
    )
  }

  const updateSelectedGames = newSelectedGames => {
    const newSignups = newSelectedGames.map(newSelectedGame => {
      return {
        gameDetails: { ...newSelectedGame },
        priority: newSelectedGames.indexOf(newSelectedGame) + 1,
        time: signupTime,
      }
    })

    const existingGames = selectedGames.filter(
      selectedGame => selectedGame.gameDetails.startTime !== signupTime
    )
    const combined = existingGames.concat(newSignups)
    dispatch(submitSelectedGames(combined))
  }

  const updateAvailableGames = newAvailableGames => {
    const existingGames = games.filter(game => game.startTime !== signupTime)
    const combined = existingGames.concat(newAvailableGames)
    dispatch(submitGetGamesAsync(combined))
  }

  // Select signup time from buttons and store it
  const selectSignupTime = signupTime => {
    dispatch(submitSignupTime(signupTime))
  }

  const showMessage = async (message): Promise<any> => {
    if (message === 'signupSubmitted') {
      setSignupSubmitted(true)
    } else if (message === 'signupError') {
      setSignupError(true)
    }
    await sleep(config.MESSAGE_DELAY)
    setSignupSubmitted(false)
    setSignupError(false)
  }

  const signupStartTime = timeFormatter.startTime(signupTime)
  const signupEndTime = timeFormatter.endTime(signupTime)

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
      {signupTimes.length === 0 && <h2>{t('noOpenSignups')}</h2>}

      {signupTimes.length !== 0 && (
        <Fragment>
          <h2>{t('signupOpen')}:</h2>
          <div>{signupTimeButtons}</div>
        </Fragment>
      )}

      {signupTime && (
        <Fragment>
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
            availableGames={filterAvailableGames()}
            selectedGames={filterSelectedGames()}
            updateSelectedGames={updateSelectedGames}
            updateAvailableGames={updateAvailableGames}
          />
        </Fragment>
      )}
    </div>
  )
}

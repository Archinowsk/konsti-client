/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import timeFormatter from 'utils/timeFormatter'
import {
  submitSignup,
  submitSelectedGames,
  submitSignupTime,
} from 'views/signup/signupActions'
import DragAndDropList from 'views/signup/components/DragAndDropList'
import sleep from 'utils/sleep'
import config from 'config'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import type { StatelessFunctionalComponent } from 'react'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

type Props = {
  hiddenGames: $ReadOnlyArray<Game>,
  games: $ReadOnlyArray<Game>,
  onSubmitSelectedGames: Function,
  onSubmitSignup: Function,
  selectedGames: $ReadOnlyArray<Signup>,
  username: string,
  signedGames: $ReadOnlyArray<Signup>,
  signupTimes: $ReadOnlyArray<string>,
  signupTime: string,
  onSubmitSignupTime: Function,
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
    hiddenGames,
    games,
    onSubmitSelectedGames,
    onSubmitSignup,
    selectedGames,
    username,
    signedGames,
    signupTimes,
    signupTime,
    onSubmitSignupTime,
  } = props

  const [submitting, setSubmitting] = React.useState(false)
  const [signupSubmitted, setSignupSubmitted] = React.useState(false)
  const [signupError, setSignupError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const { t } = useTranslation()

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(getStore())
      await onSubmitSelectedGames(signedGames)
    }
    fetchData()
    setLoading(false)
  }, [])

  // Submit signup
  const onSubmitClick = async () => {
    setSubmitting(true)

    const formattedGameData = []
    selectedGames.forEach(selectedGame => {
      formattedGameData.push({
        gameDetails: selectedGame.gameDetails,
        priority: selectedGame.priority,
        time: signupTime,
      })
    })

    const signupData = {
      username,
      selectedGames: formattedGameData,
    }

    let response = null
    try {
      response = await onSubmitSignup(signupData)
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

    const formattedGameData = []
    selectedGames.forEach(selectedGame => {
      if (selectedGame.gameDetails.startTime !== signupTime) {
        formattedGameData.push({
          gameDetails: selectedGame.gameDetails,
          priority: selectedGame.priority,
          time: signupTime,
        })
      }
    })

    const signupData = {
      username,
      selectedGames: formattedGameData,
    }

    let response = null
    try {
      response = await onSubmitSignup(signupData)
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

  // Get data from child component
  const callback = games => {
    // Combine new selected games to existing
    const temp = selectedGames.filter(
      selectedGame => selectedGame.gameDetails.startTime !== signupTime
    )
    const combined = temp.concat(games)

    onSubmitSelectedGames(combined)
  }

  // Select signup time from buttons and store it
  const selectSignupTime = signupTime => {
    onSubmitSignupTime(signupTime)
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
            callback={callback}
            selectedGames={selectedGames}
          />
        </React.Fragment>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedGames: state.signup.selectedGames,
    signupTime: state.signup.signupTime,
    username: state.login.username,
    hiddenGames: state.admin.hiddenGames,
    signedGames: state.myGames.signedGames,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitSelectedGames: selectedGames =>
      dispatch(submitSelectedGames(selectedGames)),
    onSubmitSignup: signupData => dispatch(submitSignup(signupData)),
    onSubmitSignupTime: signupTime => dispatch(submitSignupTime(signupTime)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupList)

/* @flow */
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import timeFormatter from 'utils/timeFormatter'
import { submitSignup, submitSelectedGames } from 'views/signup/signupActions'
import DragAndDropList from 'views/signup/components/DragAndDropList'
import getOpenSignupTimes from 'utils/getOpenSignupTimes'
import sleep from 'utils/sleep'
import config from 'config'

type Props = {
  t: Function,
  games: Array<Object>,
  selectedGames: Array<Object>,
  onSubmitSignup: Function,
  username: string,
  blacklistedGames: Array<Object>,
  onSubmitSelectedGames: Function,
}

type State = {
  submitting: boolean,
  signupSubmitted: boolean,
  signupError: boolean,
  signupTimes: Array<string>,
  signupTime: string,
}

const SignupList = (props: Props, state: State) => {
  const { games } = props
  const signupTimes = getOpenSignupTimes(games)

  const [submitting, setSubmitting] = React.useState(false)
  const [signupSubmitted, setSignupSubmitted] = React.useState(false)
  const [signupError, setSignupError] = React.useState(false)
  const [signupTime, setSignupTime] = React.useState('')

  // Submit signup
  const onSubmitClick = async () => {
    const { onSubmitSignup, selectedGames, username } = props
    setSubmitting(true)

    // Submit only games for selected time
    const filteredGames = selectedGames.filter(
      selectedGame => selectedGame.details.startTime === signupTime
    )

    // Send only game IDs and priorities to API
    const selectedGameIds = []
    filteredGames.forEach(filteredGame => {
      selectedGameIds.push({
        id: filteredGame.id,
        priority: filteredGame.priority,
        time: signupTime,
      })
    })

    const signupData = {
      username,
      selectedGames: selectedGameIds,
      time: signupTime,
    }

    let response = null
    try {
      response = await onSubmitSignup(signupData)
    } catch (error) {
      console.log(`onSubmitSignup error: ${error}`)
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
    const { onSubmitSignup, username } = props

    const signupData = {
      username,
      selectedGames: [],
      time: signupTime,
    }

    let response = null
    try {
      response = await onSubmitSignup(signupData)
    } catch (error) {
      console.log(`onSubmitSignup error: ${error}`)
    }

    if (response && response.status === 'success') {
      showMessage('signupSubmitted')
      setSubmitting(false)
    } else if (response && response.status === 'error') {
      showMessage('signupError')
      setSubmitting(false)
      setSignupError(true)
    }
  }

  // Get games that have signup open and are not blacklisted
  const filterGames = () => {
    const { games, blacklistedGames } = props

    // Remove hidden games
    const visibleGames = []
    for (let game of games) {
      let match = false
      for (let blacklistedGame of blacklistedGames) {
        if (game.id === blacklistedGame.id) {
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
    const { onSubmitSelectedGames, selectedGames } = props

    // Combine new selected games to existing
    const temp = selectedGames.filter(
      selectedGame => selectedGame.details.startTime !== signupTime
    )
    const combined = temp.concat(games)

    onSubmitSelectedGames(combined)
  }

  // Select signup time from buttons and store it
  const selectSignupTime = signupTime => {
    setSignupTime(signupTime)
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

  const { t, selectedGames } = props

  const filteredGames = filterGames()

  const { signupStartTime } = timeFormatter.startTime(signupTime)
  const { signupEndTime } = timeFormatter.endTime(signupTime)

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
      {signupTimes.length === 0 && (
        <p className='page-title'>{t('noOpenSignups')}</p>
      )}

      {signupTimes.length !== 0 && (
        <React.Fragment>
          <p className='page-title'>{t('signupOpen')}:</p>
          <div>{signupTimeButtons}</div>
        </React.Fragment>
      )}

      {filteredGames.length !== 0 && (
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
    username: state.login.username,
    blacklistedGames: state.admin.blacklistedGames,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitSelectedGames: selectedGames =>
      dispatch(submitSelectedGames(selectedGames)),
    onSubmitSignup: signupData => dispatch(submitSignup(signupData)),
  }
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupList)
)

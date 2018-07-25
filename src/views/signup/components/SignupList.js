/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import timeFormatter from 'utils/timeFormatter'
import {
  submitSignup,
  submitSelectedGames,
  submitSelectDate,
} from 'views/signup/signupActions'
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
  onSubmitSelectDate: Function,
  signupTime: string,
}

type State = {
  submitting: boolean,
  signupSubmitted: boolean,
  signupError: boolean,
  signupTimes: Array<string>,
}

class SignupList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { games } = this.props
    const signupTimes = getOpenSignupTimes(games)

    this.state = {
      submitting: false,
      signupSubmitted: false,
      signupError: false,
      signupTimes: signupTimes,
    }
  }

  // Submit signup
  onSubmitClick = async () => {
    const { onSubmitSignup, selectedGames, username, signupTime } = this.props
    this.setState({ submitting: true })

    // Submit only games for selected time
    const filteredGames = selectedGames.filter(
      selectedGame => selectedGame.time === signupTime
    )

    // Send only game IDs and priorities to API
    const selectedGameIds = []
    filteredGames.forEach(filteredGame => {
      selectedGameIds.push({
        id: filteredGame.id,
        priority: filteredGame.priority,
        time: signupTime,
        details: filteredGame.details,
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
      this.showMessage('signupSubmitted')
    } else if (response && response.status === 'error') {
      this.showMessage('signupError')
    }
    this.setState({ submitting: false })
  }

  // Cancel signup
  onCancelClick = async () => {
    const { onSubmitSignup, username } = this.props

    const signupData = {
      username,
      selectedGames: [],
    }

    let response = null
    try {
      response = await onSubmitSignup(signupData)
    } catch (error) {
      console.log(`onSubmitSignup error: ${error}`)
    }

    if (response && response.status === 'success') {
      this.showMessage('signupSubmitted')
      this.setState({ submitting: false })
    } else if (response && response.status === 'error') {
      this.showMessage('signupError')
      this.setState({ submitting: false, signupError: true })
    }
  }

  // Get games that have signup open and are not blacklisted
  filterGames = () => {
    const { games, blacklistedGames, signupTime } = this.props

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
  callback = games => {
    const { onSubmitSelectedGames, selectedGames, signupTime } = this.props

    // Combine new selected games to existing
    const temp = selectedGames.filter(
      selectedGame => selectedGame.time !== signupTime
    )
    const combined = temp.concat(games)

    onSubmitSelectedGames(combined)
  }

  // Select signup time from buttons and store it
  selectSignupTime = signupTime => {
    const { onSubmitSelectDate } = this.props
    onSubmitSelectDate(signupTime)
  }

  showMessage = async message => {
    if (message === 'signupSubmitted') {
      this.setState({ signupSubmitted: true })
    } else if (message === 'signupError') {
      this.setState({ signupError: true })
    }
    await sleep(config.MESSAGE_DELAY)
    this.setState({ signupSubmitted: false, signupError: false })
  }

  render() {
    const { t, selectedGames, signupTime } = this.props
    const { submitting, signupSubmitted, signupError, signupTimes } = this.state

    const filteredGames = this.filterGames()

    const { signupStartTime } = timeFormatter.startTime(signupTime)
    const { signupEndTime } = timeFormatter.endTime(signupTime)

    const isActive = isActive => (isActive ? 'active' : '')

    const signupTimeButtons = signupTimes.map(time => {
      return (
        <button
          key={time}
          onClick={() => this.selectSignupTime(time)}
          className={`button-${time} ${isActive(time === signupTime)}`}
          disabled={time === signupTime}
        >
          {timeFormatter.weekdayAndTime(time)}
        </button>
      )
    })

    return (
      <div className="signup-list">
        {signupTimes.length === 0 && (
          <p className="page-title">{t('noOpenSignups')}</p>
        )}

        {signupTimes.length !== 0 && (
          <React.Fragment>
            <p className="page-title">{t('signupOpen')}:</p>
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
              <button disabled={submitting} onClick={this.onSubmitClick}>
                {t('button.signup')}
              </button>
              <button disabled={submitting} onClick={this.onCancelClick}>
                {t('button.cancelSignup')}
              </button>
              {signupSubmitted && (
                <span className="success">{t('signupSaved')}</span>
              )}
              {signupError && (
                <span className="error">{t('signupFailed')}</span>
              )}
            </div>
            <DragAndDropList
              games={filteredGames}
              signupTime={signupTime}
              callback={this.callback}
              selectedGames={selectedGames}
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedGames: state.signup.selectedGames,
    username: state.login.username,
    blacklistedGames: state.admin.blacklistedGames,
    signupTime: state.signup.date,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitSelectedGames: selectedGames =>
      dispatch(submitSelectedGames(selectedGames)),
    onSubmitSignup: signupData => dispatch(submitSignup(signupData)),
    onSubmitSelectDate: signupTime => dispatch(submitSelectDate(signupTime)),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupList)
)

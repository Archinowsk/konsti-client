/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import timeFormatter from 'utils/timeFormatter'
import { submitSignup, submitSelectedGames } from 'views/signup/signupActions'
import DragAndDropList from 'views/signup/components/DragAndDropList'
import getOpenSignupTimes from 'utils/getOpenSignupTimes'

type Props = {
  t: Function,
  games: Array<any>,
  selectedGames: Array<any>,
  onSubmitSignup: Function,
  username: string,
  signedGames: Array<any>,
  blacklistedGames: Array<any>,
  onSubmitSelectedGames: Function,
}

type State = {
  first: string,
  second: string,
  third: string,
  submitting: boolean,
  signupSubmitted: boolean,
  signupError: boolean,
  signupTime: string,
}

class SignupList extends React.Component<Props, State> {
  state = {
    first: '',
    second: '',
    third: '',
    submitting: false,
    signupSubmitted: false,
    signupError: false,
    signupTime: null,
  }

  // Submit signup
  onSubmitClick = async () => {
    const { onSubmitSignup, selectedGames, username } = this.props
    const { signupTime } = this.state
    this.setState({ submitting: true })

    // Send only game IDs and priorities to API
    const selectedGameIds = []
    selectedGames.forEach(selectedGame => {
      selectedGameIds.push({
        id: selectedGame.id,
        priority: selectedGame.priority,
        time: signupTime,
      })
    })

    const signupData = {
      username,
      selectedGames: selectedGameIds,
    }

    let response = null
    try {
      response = await onSubmitSignup(signupData)
    } catch (error) {
      console.log(`onSubmitSignup error: ${error}`)
    }

    if (response && response.status === 'success') {
      this.setState({ submitting: false, signupSubmitted: true })
    } else if (response && response.status === 'error') {
      this.setState({ submitting: false, signupError: true })
    }
  }

  // Get games that have signup open and are not blacklisted
  filterGames = () => {
    const { games, blacklistedGames } = this.props
    const { signupTime } = this.state

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
  callback = selectedGames => {
    const { onSubmitSelectedGames } = this.props
    onSubmitSelectedGames(selectedGames)
  }

  selectSignupTime = signupTime => {
    this.setState({ signupTime })
  }

  render() {
    const { games, t, signedGames } = this.props
    const { submitting, signupSubmitted, signupError, signupTime } = this.state

    const filteredGames = this.filterGames()

    const { signupStartTime } = timeFormatter.startTime(signupTime)
    const { signupEndTime } = timeFormatter.endTime(signupTime)

    const isActive = isActive => (isActive ? 'active' : '')

    const signupTimes = getOpenSignupTimes(games)
    const signupTimeButtons = signupTimes.map(time => (
      <button
        key={time}
        onClick={() => this.selectSignupTime(time)}
        className={`button-${time} ${isActive(time === signupTime)}`}
        disabled={time === signupTime}
      >
        {timeFormatter.weekdayAndTime(time)}
      </button>
    ))

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

            <button disabled={submitting} onClick={this.onSubmitClick}>
              {t('button.signup')}
            </button>
            {signupSubmitted && <p className="success">{t('signupSaved')}</p>}
            {signupError && <p className="error">{t('signupFailed')}</p>}

            <DragAndDropList
              games={filteredGames}
              signedGames={signedGames}
              signupTime={signupTime}
              callback={this.callback}
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
    signedGames: state.myGames.signedGames,
    blacklistedGames: state.admin.blacklistedGames,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitSelectedGames: signedGames =>
      dispatch(submitSelectedGames(signedGames)),
    onSubmitSignup: signupData => dispatch(submitSignup(signupData)),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupList)
)

/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  submitSelectGame,
  submitDeselectGame,
  submitSignup,
  submitUpdatetGame,
  submitAllSelectedGames,
} from '../signupActions'

type Props = {
  t: Function,
  games: Array<any>,
  signupTime: string,
  selectedGames: Array<any>,
  onSubmitSelectGame: Function,
  onSubmitDeselectGame: Function,
  onSubmitSignup: Function,
  username: string,
  signedGames: Array<any>,
  onSubmitUpdatetGame: Function,
  blacklistedGames: Array<any>,
  // onSubmitGetUser: PropTypes.func.isRequired,
  onSubmitAllSelectedGames: Function,
}

type State = {
  submitting: boolean,
  first: boolean,
  second: boolean,
  third: boolean,
  signupSubmitted: boolean,
}

class SignupList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      submitting: false,
      first: false,
      second: false,
      third: false,
      signupSubmitted: false,
    }
  }

  props: Props

  componentDidMount() {
    this.props.onSubmitAllSelectedGames(this.props.signedGames)

    // this.setState({ first: false });
    // this.setState({ second: false });
    // this.setState({ third: false });

    // TODO: Check that starting time matches
    this.props.signedGames.forEach(signedGame => {
      if (
        signedGame.priority === 1 &&
        signedGame.time === this.props.signupTime
      ) {
        // console.log('priority and starting time match for 1');
        this.setState({ first: true })
      } else if (
        signedGame.priority === 2 &&
        signedGame.time === this.props.signupTime
      ) {
        // console.log('priority and starting time match for 2');
        this.setState({ second: true })
      } else if (
        signedGame.priority === 3 &&
        signedGame.time === this.props.signupTime
      ) {
        // console.log('priority and starting time match for 3');
        this.setState({ third: true })
      }
    })
  }

  render() {
    const {
      games,
      t,
      signupTime,
      onSubmitSelectGame,
      onSubmitDeselectGame,
      onSubmitSignup,
      selectedGames,
      username,
      signedGames,
      onSubmitUpdatetGame,
      blacklistedGames,
      // onSubmitGetUser,
    } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    if (!signedGames || signedGames === 0) {
      return <p>{t('loading')}</p>
    }

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

    const filteredGames = []

    visibleGames.forEach(game => {
      if (game.date === signupTime) {
        filteredGames.push(game)
      }
    })

    const findGame = id => {
      for (let i = 0; i < selectedGames.length; i += 1) {
        if (selectedGames[i].id === id) {
          return i
        }
      }
      return -1
    }

    const getSignupEvent = (id, event, oldValue) => {
      const priority = parseInt(event.target.value, 10)

      if (oldValue === 1) {
        this.setState({ first: false })
      } else if (oldValue === 2) {
        this.setState({ second: false })
      } else if (oldValue === 3) {
        this.setState({ third: false })
      }

      if (priority === 1) {
        this.setState({ first: true })
      } else if (priority === 2) {
        this.setState({ second: true })
      } else if (priority === 3) {
        this.setState({ third: true })
      }

      const signupData = { id, priority }
      const gameIndex = findGame(id)

      if (priority !== 0) {
        // New game
        if (gameIndex === -1) {
          onSubmitSelectGame(signupData)
          // Existing game
        } else {
          onSubmitUpdatetGame(signupData)
        }
        // Remove existing game
      } else if (priority === 0) {
        if (gameIndex > -1) {
          onSubmitDeselectGame(gameIndex)
        }
      }
    }

    const onSubmitClick = async () => {
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
        // time: signupTime,
      }

      try {
        await onSubmitSignup(signupData)
        this.setState({ submitting: false, signupSubmitted: true })
      } catch (error) {
        console.log(error)
      }
    }

    // Build component with priority dropdowns and game info
    const GamesList = filteredGames.map(game => {
      // Get existing priority value
      let priority = 0
      for (let i = 0; i < signedGames.length; i += 1) {
        if (signedGames[i].id === game.id) {
          priority = signedGames[i].priority
          break
        }
      }

      let oldValue = 0

      return (
        <p key={game.id} className="games-list">
          <select
            className="priority-select"
            defaultValue={priority}
            onFocus={event => {
              oldValue = parseInt(event.target.value, 10)
            }}
            onChange={event => {
              getSignupEvent(game.id, event, oldValue)
            }}
          >
            <option value="0">-</option>
            <option disabled={this.state.first} value="1">
              1
            </option>
            <option disabled={this.state.second} value="2">
              2
            </option>
            <option disabled={this.state.third} value="3">
              3
            </option>
          </select>

          <Link to={`/games/${game.id}`}>{game.title}</Link>
        </p>
      )
    })

    // const resultsTime = moment.utc(signupTime).format('HH:mm');

    const formattedDate = moment.utc(signupTime).format('DD.M.YYYY HH:mm')
    const startingTime = moment
      .utc(signupTime)
      .subtract(1, 'hours')
      .format('HH:mm')
    const endingTime = moment
      .utc(signupTime)
      .subtract(15, 'minutes')
      .format('HH:mm')

    return (
      <div>
        <ul className="signup-list">
          {filteredGames.length === 0 && (
            <p className="page-title">{t('noOpenSignups')}</p>
          )}

          {filteredGames.length !== 0 && (
            <p className="page-title">
              {t('signupOpen')} {formattedDate}
            </p>
          )}

          {filteredGames.length !== 0 && (
            <p>
              {t('signupOpenBetweenCapital')} {startingTime}-{endingTime}
            </p>
          )}

          {filteredGames.length !== 0 && <p>{t('signupGuide')}</p>}

          {GamesList}
        </ul>

        {this.state.signupSubmitted && <p>{t('signupSaved')}</p>}

        <p>
          {t('signupResultHint')} {endingTime}
        </p>

        <button disabled={this.state.submitting} onClick={onSubmitClick}>
          {t('button.signup')}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    signupTime: state.admin.signupTime,
    selectedGames: state.signup.selectedGames,
    username: state.login.username,
    signedGames: state.myGames.signedGames,
    blacklistedGames: state.admin.blacklistedGames,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitAllSelectedGames: signedGames =>
      dispatch(submitAllSelectedGames(signedGames)),
    onSubmitSelectGame: id => dispatch(submitSelectGame(id)),
    onSubmitDeselectGame: gameIndex => dispatch(submitDeselectGame(gameIndex)),
    onSubmitSignup: signupData => dispatch(submitSignup(signupData)),
    onSubmitUpdatetGame: signupData => dispatch(submitUpdatetGame(signupData)),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupList)
)

import PropTypes from 'prop-types'
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from '../../components/GameDetails'
import { submitGetSettings } from '../admin/adminActions'
import { submitGetUser } from '../my-games/myGamesActions'
import { submitSelectGame } from '../signup/signupActions'
import { submitGetGames } from './allGamesActions'
import AllGamesList from './components/AllGamesList'

class AllGamesView extends React.Component {
  componentDidMount() {
    /*
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    */
    this.props.onSubmitGetGames()
    this.props.onSubmitGetSettings()
    // this.props.onSubmitGetUser(this.props.username)
  }

  render() {
    const { games, t, blacklistedGames } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    // Remove hidden games
    const visibleGames = []
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

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            exact
            path="/games"
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            path="/games/:id"
            render={props => <GameDetails {...props} games={visibleGames} />}
          />
        </Switch>
      </div>
    )
  }
}

AllGamesView.propTypes = {
  t: PropTypes.func.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
  onSubmitGetSettings: PropTypes.func.isRequired,
  // signedGames: PropTypes.array.isRequired,
  // onSubmitSelectGame: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onSubmitGetUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    blacklistedGames: state.admin.blacklistedGames,
    signedGames: state.myGames.signedGames,
    username: state.login.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
    onSubmitSelectGame: id => dispatch(submitSelectGame(id)),
    onSubmitGetUser: username => dispatch(submitGetUser(username)),
  }
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AllGamesView)
)

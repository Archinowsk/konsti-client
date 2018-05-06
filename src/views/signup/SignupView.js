import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { translate } from 'react-i18next'

import { submitGetGames } from '../all-games/AllGamesActions'
import { submitGetSettings } from '../admin/AdminActions'
import { submitGetUser } from '../my-games/MyGamesActions'
import SignupList from './components/SignupList'
import GameDetails from '../../components/GameDetails'

class SignupView extends React.Component {
  componentDidMount() {
    /*
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    */
    this.props.onSubmitGetGames()
    this.props.onSubmitGetSettings()
    this.props.onSubmitGetUser(this.props.username)
  }

  render() {
    const { games, t, signedGames } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    if (!signedGames || signedGames === 0) {
      return <p>{t('loading')}</p>
    }

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/signup"
            render={props => <SignupList {...props} games={games} />}
          />
          <Route
            exact
            path="/games/:id"
            render={props => <GameDetails {...props} />}
          />
        </Switch>
      </div>
    )
  }
}

SignupView.propTypes = {
  t: PropTypes.func.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
  onSubmitGetSettings: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  onSubmitGetUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  signedGames: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    username: state.login.username,
    signedGames: state.myGames.signedGames,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
    onSubmitGetUser: username => dispatch(submitGetUser(username)),
  }
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(SignupView)
)

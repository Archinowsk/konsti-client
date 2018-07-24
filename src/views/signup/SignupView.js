/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { translate } from 'react-i18next'
import SignupList from 'views/signup/components/SignupList'
import GameDetails from 'components/GameDetails'
import { getData } from 'utils/store'

type Props = {
  t: Function,
  games: Array<any>,
  signedGames: Array<any>,
}

class SignupView extends React.Component<Props> {
  state = { loading: true }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  render() {
    const { games, t } = this.props
    const { loading } = this.state

    return (
      <div className="signup-view">
        {loading && <p>{t('loading')}</p>}
        {!loading && (
          <Switch>
            <Route
              exact
              path="/signup"
              render={props => (
                // $FlowFixMe
                <SignupList {...props} games={games} />
              )}
            />
            <Route
              exact
              path="/games/:id"
              render={props => <GameDetails {...props} />}
            />
          </Switch>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    signedGames: state.myGames.signedGames,
  }
}

export default translate()(
  connect(
    mapStateToProps,
    null
  )(SignupView)
)

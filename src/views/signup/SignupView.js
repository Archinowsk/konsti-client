/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import SignupList from 'views/signup/components/SignupList'
import GameDetails from 'components/GameDetails'
import { getData } from 'utils/store'
import Loading from 'components/Loading'

type Props = {
  t: Function,
  games: Array<any>,
}

type State = {
  loading: boolean,
}

class SignupView extends React.Component<Props, State> {
  state = { loading: true }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  render() {
    const { games } = this.props
    const { loading } = this.state

    return (
      <div className='signup-view'>
        {loading && <Loading />}
        {!loading && (
          <Switch>
            <Route
              exact
              path='/signup'
              render={props => (
                // $FlowFixMe
                <SignupList {...props} games={games} />
              )}
            />
            <Route
              exact
              path='/games/:id'
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
  }
}

export default withNamespaces()(
  connect(
    mapStateToProps,
    null
  )(SignupView)
)

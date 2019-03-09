/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
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

const SignupView = (props: Props, state: State) => {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
    setLoading(false)
  }, [])

  const { games } = props

  return (
    <div className='signup-view'>
      {loading && <Loading />}
      {!loading && (
        <Switch>
          <Route
            exact
            path='/signup'
            render={props => <SignupList {...props} games={games} />}
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

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
  }
}

export default withTranslation()(
  connect(
    mapStateToProps,
    null
  )(SignupView)
)

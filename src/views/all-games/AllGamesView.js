/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from 'components/GameDetails'
import AllGamesList from 'views/all-games/components/AllGamesList'
import { getData } from 'utils/store'
import Loading from 'components/Loading'

type Props = {
  games: Array<any>,
  blacklistedGames: Array<any>,
  myGames: Object,
}

type State = {
  loading: boolean,
}

const AllGamesView = (props: Props, state: State) => {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
    setLoading(false)
  }, [])

  // Remove hidden games
  const getVisibleGames = () => {
    const { games, blacklistedGames } = props

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
    return visibleGames
  }

  const visibleGames = getVisibleGames()

  return (
    <div className='all-games-view'>
      {loading && <Loading />}
      {!loading && (
        <Switch>
          <Route
            exact
            path='/'
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            exact
            path='/games'
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            path='/games/:id'
            render={props => <GameDetails {...props} games={visibleGames} />}
          />
        </Switch>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    blacklistedGames: state.admin.blacklistedGames,
    myGames: state.myGames,
  }
}

export default connect(
  mapStateToProps,
  null
)(AllGamesView)

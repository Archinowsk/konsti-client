/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import MySignupsList from 'views/my-games/components/MySignupsList'
import MyFavoritesList from 'views/my-games/components/MyFavoritesList'
import MyEnteredList from 'views/my-games/components/MyEnteredList'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import type { Game, GameWithPriority } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  signedGames: Array<GameWithPriority>,
  favoritedGames: Array<Game>,
  enteredGames: Array<GameWithPriority>,
}

/*
type State = {
  loading: boolean,
}
*/

const MyGamesView: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { signedGames, favoritedGames, enteredGames } = props
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(getStore())
    }
    fetchData()
    setLoading(false)
  }, [])

  return (
    <div className='my-games-view'>
      {loading && <Loading />}
      {!loading && (
        <React.Fragment>
          <MyFavoritesList favoritedGames={favoritedGames} />
          <MySignupsList signedGames={signedGames} />
          <MyEnteredList
            enteredGames={enteredGames}
            signedGames={signedGames}
          />
        </React.Fragment>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    signedGames: state.myGames.signedGames,
    favoritedGames: state.myGames.favoritedGames,
    enteredGames: state.myGames.enteredGames,
    games: state.allGames.games,
    myGames: state.myGames,
  }
}

export default connect(
  mapStateToProps,
  null
)(MyGamesView)

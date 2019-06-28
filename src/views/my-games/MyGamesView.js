/* @flow */
import React from 'react'
import { useSelector, useStore } from 'react-redux'
import { MySignupsList } from 'views/my-games/components/MySignupsList'
import { MyFavoritesList } from 'views/my-games/components/MyFavoritesList'
import { MyEnteredList } from 'views/my-games/components/MyEnteredList'
import { loadData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import type { StatelessFunctionalComponent } from 'react'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

export const MyGamesView: StatelessFunctionalComponent<{}> = () => {
  const signedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.signedGames
  )
  const favoritedGames: $ReadOnlyArray<Game> = useSelector(
    state => state.myGames.favoritedGames
  )
  const enteredGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.enteredGames
  )
  const store = useStore()

  const [loading, setLoading] = React.useState(true)
  ;(loading: boolean)

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(store)
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

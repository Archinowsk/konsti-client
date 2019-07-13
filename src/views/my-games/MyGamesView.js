/* @flow */
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { MySignupsList } from 'views/my-games/components/MySignupsList'
import { MyFavoritesList } from 'views/my-games/components/MyFavoritesList'
import { MyEnteredList } from 'views/my-games/components/MyEnteredList'
import type { StatelessFunctionalComponent, Element } from 'react'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

type Props = {}

export const MyGamesView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const signedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.signedGames
  )
  const favoritedGames: $ReadOnlyArray<Game> = useSelector(
    state => state.myGames.favoritedGames
  )
  const enteredGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.enteredGames
  )

  return (
    <div className='my-games-view'>
      <Fragment>
        <MyFavoritesList favoritedGames={favoritedGames} />
        <MySignupsList signedGames={signedGames} />
        <MyEnteredList enteredGames={enteredGames} signedGames={signedGames} />
      </Fragment>
    </div>
  )
}

/* @flow */
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { MySignupsList } from 'views/my-games/components/MySignupsList'
import { MyFavoritesList } from 'views/my-games/components/MyFavoritesList'
import { MyEnteredList } from 'views/my-games/components/MyEnteredList'
import {
  getUpcomingSignedGames,
  getUpcomingEnteredGames,
  getUpcomingFavorites,
} from 'utils/getUpcomingGames'
import type { StatelessFunctionalComponent, Element } from 'react'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

type Props = {}

export const MyGamesView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { t } = useTranslation()

  const signedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.signedGames
  )
  const favoritedGames: $ReadOnlyArray<Game> = useSelector(
    state => state.myGames.favoritedGames
  )
  const enteredGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.enteredGames
  )

  const testTime: string = useSelector(state => state.admin.testTime)

  const [showAllGames, setShowAllGames] = React.useState(false)
  ;(showAllGames: boolean)

  return (
    <div className='my-games-view'>
      <Fragment>
        <div className='my-games-toggle-visibility'>
          <button
            onClick={() => setShowAllGames(false)}
            disabled={!showAllGames}
          >
            {t('lastStartedAndUpcomingGames')}
          </button>
          <button onClick={() => setShowAllGames(true)} disabled={showAllGames}>
            {t('allGames')}
          </button>
        </div>

        <MyFavoritesList
          favoritedGames={
            showAllGames
              ? favoritedGames
              : getUpcomingFavorites(favoritedGames, testTime)
          }
        />

        <MySignupsList
          signedGames={
            showAllGames
              ? signedGames
              : getUpcomingSignedGames(signedGames, testTime)
          }
        />

        <MyEnteredList
          enteredGames={
            showAllGames
              ? enteredGames
              : getUpcomingEnteredGames(enteredGames, testTime)
          }
          signedGames={
            showAllGames
              ? signedGames
              : getUpcomingSignedGames(signedGames, testTime)
          }
        />
      </Fragment>
    </div>
  )
}

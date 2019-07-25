/* @flow */
import React, { Fragment } from 'react'
import { useSelector, useStore } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { MySignupsList } from 'views/my-games/components/MySignupsList'
import { MyFavoritesList } from 'views/my-games/components/MyFavoritesList'
import { MyEnteredList } from 'views/my-games/components/MyEnteredList'
import {
  getUpcomingSignedGames,
  getUpcomingEnteredGames,
  getUpcomingFavorites,
} from 'utils/getUpcomingGames'
import { loadUser, loadGames, loadGroupMembers } from 'utils/loadData'
import { isGroupLeader } from 'views/group/GroupView'
import type { StatelessFunctionalComponent, Element } from 'react'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'
import type { GroupMember } from 'flow/group.flow'

type Props = {}

export const MyGamesView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { t } = useTranslation()

  const serial: string = useSelector(state => state.login.serial)
  const groupCode: string = useSelector(state => state.login.groupCode)
  const signedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.signedGames
  )
  const favoritedGames: $ReadOnlyArray<Game> = useSelector(
    state => state.myGames.favoritedGames
  )
  const enteredGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.enteredGames
  )
  const groupMembers: $ReadOnlyArray<GroupMember> = useSelector(
    state => state.login.groupMembers
  )

  const testTime: string = useSelector(state => state.admin.testTime)

  const [showAllGames, setShowAllGames] = React.useState(false)
  ;(showAllGames: boolean)

  const store = useStore()

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      await loadGames(store)
      await loadUser(store)
      await loadGroupMembers(store)
    }
    fetchData()
  }, [store])

  const leader = isGroupLeader(groupCode, serial)

  const getGroupLeader = (
    groupMembers: $ReadOnlyArray<GroupMember>
  ): GroupMember => {
    const groupLeader = groupMembers.find(
      member => member.serial === member.groupCode
    )
    if (!groupLeader) throw new Error('Cannot find group leader')
    return groupLeader
  }

  const getSignedGames = (
    signedGames: $ReadOnlyArray<Signup>
  ): $ReadOnlyArray<Signup> => {
    if (leader) {
      if (!showAllGames) return getUpcomingSignedGames(signedGames, testTime)
      else return signedGames
    }

    if (!leader) {
      const groupLeader = getGroupLeader(groupMembers)
      if (!showAllGames) {
        return getUpcomingSignedGames(groupLeader.signedGames, testTime)
      } else return groupLeader.signedGames
    }

    return signedGames
  }

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

        {!leader && (
          <div className='my-games-group-notification'>
            <p className='bold'>{t('inGroupSignups')}</p>
          </div>
        )}

        <MySignupsList signedGames={getSignedGames(signedGames)} />

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

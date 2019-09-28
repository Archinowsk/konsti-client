// @flow
import React from 'react'
import { useSelector, useStore } from 'react-redux'
import { SignupList } from 'views/signup/components/SignupList'
import { getOpenStartTimes } from 'utils/getOpenStartTimes'
import { loadGroupMembers, loadUser } from 'utils/loadData'
import { isGroupLeader } from 'views/group/GroupView'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const SignupView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const testTime: string = useSelector(state => state.admin.testTime)
  const serial: string = useSelector(state => state.login.serial)
  const groupCode: string = useSelector(state => state.login.groupCode)

  const [signupTimes, setSignupTimes] = React.useState([])
  ;(signupTimes: $ReadOnlyArray<string>)

  const store = useStore()

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      await loadUser(store)
      await loadGroupMembers(store)
    }
    fetchData()
  }, [store])

  React.useEffect(() => {
    setSignupTimes(getOpenStartTimes(games, testTime))
  }, [games, testTime])

  const leader = isGroupLeader(groupCode, serial)

  return (
    <div className='signup-view'>
      <SignupList games={games} signupTimes={signupTimes} leader={leader} />
    </div>
  )
}

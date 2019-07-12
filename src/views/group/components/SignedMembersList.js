/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { timeFormatter } from 'utils/timeFormatter'
import type { GroupMember } from 'flow/group.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {|
  groupMembers: $ReadOnlyArray<GroupMember>,
|}

export const SignedMembersList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { groupMembers } = props

  if (!groupMembers) return <div className='signed-games-list' />

  const leader = groupMembers.find(member => member.serial === member.groupCode)

  if (!leader) return <div className='signed-games-list' />

  const sortedGames = _.sortBy(leader.signedGames, [
    signedGame => signedGame.gameDetails.startTime,
    signedGame => signedGame.priority,
  ])

  const signedGamesList = sortedGames.map(signedGame => {
    const formattedDate = timeFormatter.weekdayAndTime(
      signedGame.gameDetails.startTime
    )

    return (
      <li key={signedGame.gameDetails.gameId}>
        <Link to={`/games/${signedGame.gameDetails.gameId}`}>
          {formattedDate}: {signedGame.gameDetails.title} ({signedGame.priority}
          )
        </Link>
      </li>
    )
  })
  return <div className='signed-games-list'>{signedGamesList}</div>
}

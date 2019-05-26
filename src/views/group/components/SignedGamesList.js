/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'
import { sortArrayByKey } from 'utils/sort'
import type { GroupMember } from 'flow/group.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  groupMembers: Array<GroupMember>,
}

const SignedMembersList: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { groupMembers } = props

  if (!groupMembers) return <div className='signed-games-list' />

  const leader = groupMembers.find(
    member => member.serial === member.playerGroup
  )

  // Sort games by time and name
  if (!leader) return <div className='signed-games-list' />

  const sortedGames = sortArrayByKey(
    leader.signedGames,
    'gameDetails.startTime',
    'gameDetails.title'
  )

  const signedGamesList = sortedGames.map(signedGame => {
    const formattedDate = timeFormatter.weekdayAndTime(
      signedGame.gameDetails.startTime
    )

    return (
      <React.Fragment key={signedGame.gameDetails.gameId}>
        <li>
          <Link to={`/games/${signedGame.gameDetails.gameId}`}>
            {formattedDate}: {signedGame.gameDetails.title} (
            {signedGame.priority})
          </Link>
        </li>
      </React.Fragment>
    )
  })
  return <div className='signed-games-list'>{signedGamesList}</div>
}

export default SignedMembersList

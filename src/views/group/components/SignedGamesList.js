/* @flow */
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  groupMembers: Array<Object>,
}

const SignedMembersList = (props: Props) => {
  const { groupMembers } = props

  if (!groupMembers) return <div className='signed-games-list' />

  const leader = groupMembers.filter(
    member => member.serial === member.playerGroup
  )

  // Sort games by time and name
  if (!leader || !leader[0]) return <div className='signed-games-list' />

  const sortedGames = leader[0].signedGames.sort((a, b) => {
    const keyA = moment(a.startTime) + a.title.toLowerCase()
    const keyB = moment(b.startTime) + b.title.toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const signedGamesList = sortedGames.map(signedGame => {
    const formattedDate = timeFormatter.weekdayAndTime(signedGame.startTime)

    return (
      <React.Fragment key={signedGame.id}>
        <li>
          <Link to={`/games/${signedGame.id}`}>
            {formattedDate}: {signedGame.title} ({signedGame.priority})
          </Link>
        </li>
      </React.Fragment>
    )
  })
  return <div className='signed-games-list'>{signedGamesList}</div>
}

export default SignedMembersList

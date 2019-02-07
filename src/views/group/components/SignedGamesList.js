/* @flow */
import React from 'react'
import { withTranslation } from 'react-i18next'
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
    const keyA = moment(a.details.startTime) + a.details.title.toLowerCase()
    const keyB = moment(b.details.startTime) + b.details.title.toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const signedGamesList = sortedGames.map(signedGame => {
    const formattedDate = timeFormatter.weekdayAndTime(
      signedGame.details.startTime
    )

    return (
      <React.Fragment key={signedGame.details.id}>
        <li>
          <Link to={`/games/${signedGame.id}`}>
            {formattedDate}: {signedGame.details.title} ({signedGame.priority})
          </Link>
        </li>
      </React.Fragment>
    )
  })
  return <div className='signed-games-list'>{signedGamesList}</div>
}

export default withTranslation()(SignedMembersList)

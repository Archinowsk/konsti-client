/* @flow */
import React from 'react'
// import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
// import { timeFormatter } from 'utils/timeFormatter'
import { SignupsByStartTimes } from 'views/my-games/components/SignupsByStartTimes'
import { getStartTimes } from 'utils/getStartTimes'
import type { GroupMember } from 'flow/group.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {|
  groupMembers: $ReadOnlyArray<GroupMember>,
|}

export const GroupSignedGamesList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { groupMembers } = props
  const { t } = useTranslation()

  if (!groupMembers) return <div className='signed-games-list' />

  const leader = groupMembers.find(member => member.serial === member.groupCode)

  if (!leader) return <div className='signed-games-list' />

  const sortedGames = _.sortBy(leader.signedGames, [
    signedGame => signedGame.gameDetails.startTime,
    signedGame => signedGame.priority,
  ])

  const startTimes = getStartTimes(
    leader.signedGames.map(signedGame => signedGame.gameDetails)
  )

  /*
  const signedGamesList = sortedGames.map(signedGame => {
    const formattedDate = timeFormatter.weekdayAndTime({
      time: signedGame.gameDetails.startTime,
      capitalize: true,
    })

    return (
      <li key={signedGame.gameDetails.gameId}>
        <Link to={`/games/${signedGame.gameDetails.gameId}`}>
          {formattedDate}: {signedGame.gameDetails.title} ({signedGame.priority}
          )
        </Link>
      </li>
    )
  })
  */
  // return <div className='signed-games-list'>{signedGamesList}</div>
  return (
    <div className='my-signups-games'>
      {leader.signedGames.length === 0 && <span>{t('noSignedGames')}</span>}
      {leader.signedGames.length !== 0 && (
        <SignupsByStartTimes signups={sortedGames} startTimes={startTimes} />
      )}
    </div>
  )
}

/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { getStartTimes } from 'utils/getStartTimes'
import GamesByStartTimes from './GamesByStartTimes'
import type { Signup } from 'flow/user.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  enteredGames: $ReadOnlyArray<Signup>,
}

const MyEnteredList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { enteredGames } = props
  const { t } = useTranslation()

  const sortedEntered = _.sortBy(enteredGames, [
    enteredGame => enteredGame.gameDetails.startTime,
    enteredGame => enteredGame.gameDetails.title.toLowerCase(),
  ])

  const startTimes = getStartTimes(
    enteredGames.map(enteredGame => enteredGame.gameDetails)
  )

  return (
    <div className='my-entered-list'>
      <h3>{t('enteredGames')}</h3>
      <div className='my-signups-games'>
        {enteredGames.length === 0 && <span>{t('noEnteredGames')}</span>}
        {enteredGames.length !== 0 && (
          <GamesByStartTimes signups={sortedEntered} startTimes={startTimes} />
        )}
      </div>
    </div>
  )
}

export default MyEnteredList

/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import type { StatelessFunctionalComponent } from 'react'
import type { Results } from 'flow/result.flow'

type Props = {|
  results: Results,
|}

export const ResultsByGameTitle: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { results } = props
  const { t } = useTranslation()

  const sortedResults = _.sortBy(results.result, [
    result => result.enteredGame.gameDetails.title.toLowerCase(),
  ])

  const groupedResults = _.groupBy(
    sortedResults,
    'enteredGame.gameDetails.title'
  )

  const resultsByGameTitle = []

  for (const result in groupedResults) {
    const sortedResults = _.sortBy(groupedResults[result], [
      result => result.username.toLowerCase(),
    ])

    const playerList = sortedResults.map(result => (
      <p key={result.username}>{result.username}</p>
    ))

    resultsByGameTitle.push(
      <div className='game-result' key={result}>
        <p>
          <span className='bold'>{t('gameTitle')}:</span> {result}
        </p>
        <p>
          <span className='bold'>{t('gameInfo.location')}:</span>{' '}
          {_.head(groupedResults[result]).enteredGame.gameDetails.location}
        </p>
        <p className='bold'>{t('players')}:</p>
        <div className='result-player-list'>{playerList}</div>
      </div>
    )
  }

  return resultsByGameTitle
}

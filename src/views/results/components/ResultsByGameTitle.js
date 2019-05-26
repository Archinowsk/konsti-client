/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { sortArrayByKey } from 'utils/sort'
import type { StatelessFunctionalComponent } from 'react'
import type { Results } from 'flow/result.flow'

type Props = {
  results: Results,
}

const ResultsByGameTitle: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { results } = props
  const { t } = useTranslation()

  const sortedResults = sortArrayByKey(results.result, 'enteredGame.title')
  const groupedResults = _.groupBy(sortedResults, 'enteredGame.title')

  const resultsByGameTitle = []

  for (let result in groupedResults) {
    const playerList = sortArrayByKey(groupedResults[result], 'username').map(
      result => <p key={result.username}>{result.username}</p>
    )

    resultsByGameTitle.push(
      <div className='game-result' key={result}>
        <p>
          <span className='bold'>{t('gameTitle')}:</span> {result}
        </p>
        <p>
          <span className='bold'>{t('gameInfo.location')}:</span>{' '}
          {_.head(groupedResults[result]).enteredGame.location}
        </p>
        <p className='bold'>{t('players')}:</p>
        <div className='result-player-list'>{playerList}</div>
      </div>
    )
  }

  return resultsByGameTitle
}

export default ResultsByGameTitle

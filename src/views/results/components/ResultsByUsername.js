/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import type { StatelessFunctionalComponent } from 'react'
import type { Results } from 'flow/result.flow'

type Props = {
  results: Results,
}

const ResultsByUsername: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { results } = props
  const { t } = useTranslation()

  const sortedResults = _.sortBy(results.result, [
    result => result.username.toLowerCase(),
  ])

  const resultsTable = sortedResults.map(result => (
    <div className='flex-table-column' key={result.username}>
      <div className='flex-table-row'>{result.username}</div>
      <div className='flex-table-row'>
        {result.enteredGame.gameDetails.title}
      </div>
      <div className='flex-table-row'>
        {result.enteredGame.gameDetails.location}
      </div>
    </div>
  ))

  const resultsByUsername = (
    <div className='flex-table-container'>
      <div className='flex-table-column flex-table-header'>
        <div className='flex-table-row'>{t('player')}</div>
        <div className='flex-table-row'>{t('gameTitle')}</div>
        <div className='flex-table-row'>{t('gameInfo.location')}</div>
      </div>
      <div>{resultsTable}</div>
    </div>
  )

  return resultsByUsername
}

export default ResultsByUsername

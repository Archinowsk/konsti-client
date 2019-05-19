/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { sortArrayByKey } from 'utils/sort'
import type { StatelessFunctionalComponent } from 'react'
import type { Result } from 'flow/result.flow'

type Props = {
  results: Array<Result>,
}

const ResultsByUsername: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { t } = useTranslation()

  const sortedResults = sortArrayByKey(props.results, 'username').map(
    result => (
      <div className='flex-table-column' key={result.username}>
        <div className='flex-table-row'>{result.username}</div>
        <div className='flex-table-row'>{result.enteredGame.title}</div>
        <div className='flex-table-row'>{result.enteredGame.location}</div>
      </div>
    )
  )

  const resultsByUsername = (
    <div className='flex-table-container'>
      <div className='flex-table-column flex-table-header'>
        <div className='flex-table-row'>{t('player')}</div>
        <div className='flex-table-row'>{t('gameTitle')}</div>
        <div className='flex-table-row'>{t('gameInfo.location')}</div>
      </div>
      <div>{sortedResults}</div>
    </div>
  )

  return resultsByUsername
}

export default ResultsByUsername

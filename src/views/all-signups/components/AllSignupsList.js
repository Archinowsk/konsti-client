/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { sortArrayByKey } from 'utils/sort'

type Props = {
  results: Array<any>,
}

const AllSignupsList = (props: Props) => {
  const { results } = props
  const { t } = useTranslation()

  const sortedResults = sortArrayByKey(results, 'username')

  const resultsList = sortedResults.map(result => (
    <p key={result.username}>
      <span className='bold'>{result.username}:</span>{' '}
      {result.enteredGame.title} (
      <span className='bold'>
        {t('gameInfo.location')}: {result.enteredGame.location}
      </span>
      )
    </p>
  ))

  return <div className='results-list'>{resultsList}</div>
}

export default AllSignupsList

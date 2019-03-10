/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  results: Array<any>,
}

const AllSignupsList = (props: Props) => {
  const { results } = props
  const { t } = useTranslation()

  // Sort games by name
  const sortedResults = results.sort((a, b) => {
    const keyA = a.username.toLowerCase()
    const keyB = b.username.toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

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

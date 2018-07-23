/* @flow */
import React from 'react'
import { translate } from 'react-i18next'

type Props = {
  t: Function,
  results: Array<any>,
}

const AllSignupsList = (props: Props) => {
  const { t, results } = props

  // Sort games by name
  const sortedResults = results.sort((a, b) => {
    const keyA = a.username
    const keyB = b.username
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const resultsList = sortedResults.map(result => (
    <p key={result.username}>
      <span className="bold">{result.username}:</span>{' '}
      {result.enteredGame.title} (<span className="bold">
        {t('gameInfo.location')}: {result.enteredGame.location}
      </span>)
    </p>
  ))

  return <div className="results-list">{resultsList}</div>
}

export default translate()(AllSignupsList)

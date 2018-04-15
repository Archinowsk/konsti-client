import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import moment from 'moment'
// import { Link } from 'react-router-dom';
// import moment from 'moment';

const AllSignupsList = props => {
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

  return <div>{resultsList}</div>
}

AllSignupsList.propTypes = {
  t: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
}

export default translate()(AllSignupsList)

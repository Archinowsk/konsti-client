/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import type { StatelessFunctionalComponent, Element } from 'react'
import type { Result } from 'flow/result.flow'

type Props = {||}

export const ResultsList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const results: $ReadOnlyArray<Result> = useSelector(
    state => state.results.result
  )
  const { t } = useTranslation()

  const sortedResults = _.sortBy(results, [
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
        <p>
          <span className='bold'>{t('players')}: </span>
          {playerList.length}/
          {_.head(groupedResults[result]).enteredGame.gameDetails.maxAttendance}
        </p>
      </div>
    )
  }

  return (
    <div className='results-with-free-seats'>
      <h3>{t('signupResults')}</h3>
      {resultsByGameTitle}
    </div>
  )
}

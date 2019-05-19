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
      <p key={result.username}>
        <span className='bold'>{result.username}: </span>
        {result.enteredGame.title} (
        <span className='bold'>
          {t('gameInfo.location')}: {result.enteredGame.location}
        </span>
        )
      </p>
    )
  )

  const resultsByUsername = <div>{sortedResults}</div>

  return resultsByUsername
}

export default ResultsByUsername

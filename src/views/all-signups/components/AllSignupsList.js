/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { sortArrayByKey } from 'utils/sort'
import type { Result } from 'flow/result.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  results: Array<Result>,
}

/*
type State = {
  sortedBy: string,
}
*/

const AllSignupsList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { results } = props
  const { t } = useTranslation()
  const [sortedBy, setSortedBy] = React.useState('')

  React.useEffect(() => {
    setSortedBy('username')
  }, [])

  const buttons = ['username', 'enteredGameTitle']

  return (
    <div className='results-list'>
      <span>{t('sortBy')} </span>

      {buttons.map(name => {
        return (
          <button
            className={sortedBy === name ? 'active' : ''}
            value={name}
            onClick={() => setSortedBy(name)}
            key={name}
          >
            {t(name)}
          </button>
        )
      })}

      {sortedBy === 'username' &&
        sortArrayByKey(results, 'username').map(result => (
          <p key={result.username}>
            <span className='bold'>{result.username}: </span>
            {result.enteredGame.title} (
            <span className='bold'>
              {t('gameInfo.location')}: {result.enteredGame.location}
            </span>
            )
          </p>
        ))}

      {sortedBy === 'enteredGameTitle' &&
        sortArrayByKey(results, 'enteredGame.title').map(result => (
          <p key={result.username}>
            <span className='bold'>{result.enteredGame.title}: </span>
            {result.username} (
            <span className='bold'>
              {t('gameInfo.location')}: {result.enteredGame.location}
            </span>
            )
          </p>
        ))}
    </div>
  )
}

export default AllSignupsList

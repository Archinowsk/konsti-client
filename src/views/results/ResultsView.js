/* @flow */
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ResultsList } from 'views/results/components/ResultsList'
import { timeFormatter } from 'utils/timeFormatter'
import type { Results } from 'flow/result.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const ResultsView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const results: Results = useSelector(state => state.results.results)
  const signupTime: string = useSelector(state => state.admin.signupTime)
  const { t } = useTranslation()

  const formattedDate = timeFormatter.weekdayAndTime(signupTime)

  return (
    <div className='results-view'>
      {!results && <h2>{t('noResults')}</h2>}
      {results && (
        <Fragment>
          <h2>
            {t('signupResultsfor')} {formattedDate}
          </h2>
          <ResultsList results={results} />
        </Fragment>
      )}
    </div>
  )
}

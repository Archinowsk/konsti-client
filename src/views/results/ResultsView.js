/* @flow */
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ResultsList } from 'views/results/components/ResultsList'
import { timeFormatter } from 'utils/timeFormatter'
import type { Result } from 'flow/result.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const ResultsView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const result: $ReadOnlyArray<Result> = useSelector(
    state => state.results.result
  )
  const signupTime: string = useSelector(state => state.admin.signupTime)
  const { t } = useTranslation()

  const formattedDate = timeFormatter.weekdayAndTime({
    time: signupTime,
    capitalize: false,
  })

  return (
    <div className='results-view'>
      {!signupTime && <h2>{t('noResults')}</h2>}
      {signupTime && (
        <Fragment>
          <h2>
            {t('signupResultsfor')} {formattedDate}
          </h2>
          <ResultsList results={result} />
        </Fragment>
      )}
    </div>
  )
}

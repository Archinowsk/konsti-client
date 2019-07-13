/* @flow */
import React, { Fragment } from 'react'
import { useSelector, useStore } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ResultsList } from 'views/results/components/ResultsList'
import { loadData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import { timeFormatter } from 'utils/timeFormatter'
import type { Results } from 'flow/result.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const ResultsView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const results: Results = useSelector(state => state.results.results)
  const signupTime: string = useSelector(state => state.admin.signupTime)
  const store = useStore()
  const { t } = useTranslation()

  const [loading, setLoading] = React.useState(true)
  ;(loading: boolean)

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      await loadData(store)
    }
    fetchData()
    setLoading(false)
  }, [store])

  const formattedDate = timeFormatter.weekdayAndTime(signupTime)

  return (
    <div className='results-view'>
      {loading && <Loading />}
      {!loading && !results && <h2>{t('noResults')}</h2>}
      {!loading && results && (
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

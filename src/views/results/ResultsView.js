/* @flow */
import React from 'react'
import { useSelector, useStore } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ResultsList } from 'views/results/components/ResultsList'
import { loadData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import { timeFormatter } from 'utils/timeFormatter'
import type { Results } from 'flow/result.flow'
import type { StatelessFunctionalComponent } from 'react'

export const ResultsView: StatelessFunctionalComponent<{}> = () => {
  const results: Results = useSelector(state => state.results.results)
  const signupTime: string = useSelector(state => state.admin.signupTime)
  const store = useStore()
  const { t } = useTranslation()

  const [loading, setLoading]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(store)
    }
    fetchData()
    setLoading(false)
  }, [])

  const formattedDate = timeFormatter.weekdayAndTime(signupTime)

  return (
    <div className='results-view'>
      {loading && <Loading />}
      {!loading && !results && <p className='page-title'>{t('noResults')}</p>}
      {!loading && results && (
        <React.Fragment>
          <p className='page-title'>
            {t('signupResultsfor')} {formattedDate}
          </p>
          <ResultsList results={results} />
        </React.Fragment>
      )}
    </div>
  )
}

/* @flow */
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useStore } from 'react-redux'
import { ResultsList } from 'views/helper/components/ResultsList'
import { PasswordManagement } from 'views/helper/components/PasswordManagement'
import { loadResults, loadSettings } from 'utils/loadData'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const HelperView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { t } = useTranslation()

  const [selectedTool, setSelectedTool] = React.useState('results')
  ;(selectedTool: string)

  const store = useStore()

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      await loadSettings(store)
      await loadResults(store)
    }
    fetchData()
  }, [store])

  return (
    <div className='helper-view'>
      <button
        disabled={selectedTool === 'results'}
        onClick={() => setSelectedTool('results')}
      >
        {t('helperResults')}
      </button>
      <button
        disabled={selectedTool === 'password-management'}
        onClick={() => setSelectedTool('password-management')}
      >
        {t('helperPasswordManagement')}
      </button>

      <Fragment>
        {selectedTool === 'results' && <ResultsList />}
        {selectedTool === 'password-management' && <PasswordManagement />}
      </Fragment>
    </div>
  )
}

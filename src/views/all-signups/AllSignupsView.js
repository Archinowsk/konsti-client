/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import AllSignupsList from 'views/all-signups/components/AllSignupsList'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'

export type Result = {
  username: string,
  enteredGame: Game,
  signedGames: Array<Game>,
}

type Props = {
  results: Array<Result>,
  signupTime: string,
}

type State = {
  loading: boolean,
}

const AllSignupsView = (props: Props, state: State) => {
  const { results, signupTime } = props
  const { t } = useTranslation()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(getStore())
    }
    fetchData()
    setLoading(false)
  }, [])

  const formattedDate = timeFormatter.weekdayAndTime(signupTime)

  return (
    <div className='all-signups-view'>
      {loading && <Loading />}
      {!loading && !results && <p className='page-title'>{t('noResults')}</p>}
      {!loading && results && (
        <React.Fragment>
          <p className='page-title'>
            {t('signupResultsfor')} {formattedDate}
          </p>
          <AllSignupsList results={results} />
        </React.Fragment>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    results: state.allSignups.results,
    signupTime: state.admin.signupTime,
  }
}

export default connect(
  mapStateToProps,
  null
)(AllSignupsView)

/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import AllSignupsList from 'views/all-signups/components/AllSignupsList'
import { getData } from 'utils/store'
import Loading from 'components/Loading'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'

type Props = {
  games: Array<Game>,
  results: Array<any>,
  signupTime: string,
}

type State = {
  loading: boolean,
}

const AllSignupsView = (props: Props, state: State) => {
  const { games, results, signupTime } = props
  const { t } = useTranslation()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
    setLoading(false)
  }, [])

  let selectedResult = []
  for (let result of results) {
    if (result.startTime === signupTime) {
      selectedResult = result.result
      break
    }
  }

  games.map(game => {
    selectedResult.map(result => {
      if (game.gameId === result.enteredGame.gameId) {
        Object.assign(result.enteredGame, game)
      }
    })
  })

  let resultsAvailable = false
  if (selectedResult && selectedResult.length !== 0) {
    resultsAvailable = true
  }

  const formattedDate = timeFormatter.weekdayAndTime(signupTime)

  return (
    <div className='all-signups-view'>
      {loading && <Loading />}
      {!loading && !resultsAvailable && (
        <p className='page-title'>{t('noResults')}</p>
      )}
      {!loading && resultsAvailable && (
        <React.Fragment>
          <p className='page-title'>
            {t('signupResultsfor')} {formattedDate}
          </p>
          <AllSignupsList results={selectedResult} />
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

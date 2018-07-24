/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import AllSignupsList from 'views/all-signups/components/AllSignupsList'
import { getData } from 'utils/store'
import Loading from 'components/Loading'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  t: Function,
  games: Array<any>,
  results: Array<any>,
  signupTime: string,
}

type State = {
  loading: boolean,
}

class AllSignupsView extends React.Component<Props, State> {
  state = {
    loading: true,
  }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  render() {
    const { games, t, results, signupTime } = this.props
    const { loading } = this.state

    let selectedResult = []
    for (let result of results) {
      if (result.startTime === signupTime) {
        selectedResult = result.result
        break
      }
    }

    for (let game of games) {
      for (let result of selectedResult) {
        if (game.id === result.enteredGame.id) {
          Object.assign(result.enteredGame, game)
        }
      }
    }

    let resultsAvailable = false
    if (selectedResult && selectedResult.length !== 0) {
      resultsAvailable = true
    }

    const formattedDate = timeFormatter.weekdayAndTime(signupTime)

    return (
      <div className="all-signups-view">
        {loading && <Loading />}
        {!resultsAvailable && <p className="page-title">{t('noResults')}</p>}
        {!loading &&
          resultsAvailable && (
            <React.Fragment>
              <p className="page-title">
                {t('signupResultsfor')} {formattedDate}
              </p>
              <AllSignupsList results={selectedResult} />
            </React.Fragment>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    results: state.allSignups.results,
    signupTime: state.admin.signupTime,
  }
}

export default translate()(
  connect(
    mapStateToProps,
    null
  )(AllSignupsView)
)

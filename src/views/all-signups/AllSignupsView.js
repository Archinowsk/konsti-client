/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import moment from 'moment'

import { submitGetResults } from 'views/all-signups/allSignupsActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitGetSettings } from 'views/admin/adminActions'

import AllSignupsList from 'views/all-signups/components/AllSignupsList'

type Props = {
  t: Function,
  onSubmitGetGames: Function,
  games: Array<any>,
  onSubmitGetResults: Function,
  onSubmitGetSettings: Function,
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
    const {
      onSubmitGetGames,
      onSubmitGetSettings,
      onSubmitGetResults,
    } = this.props

    await onSubmitGetGames()
    await onSubmitGetSettings()
    await onSubmitGetResults()

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

    const formattedDate = moment(signupTime).format('DD.M.YYYY HH:mm')

    return (
      <div className="all-signups-view">
        {loading && <p className="page-title">{t('loading')}</p>}
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

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetResults: () => dispatch(submitGetResults()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllSignupsView)
)

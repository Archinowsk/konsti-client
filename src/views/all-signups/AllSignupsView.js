/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import moment from 'moment'

import { submitGetResults } from '/views/all-signups/allSignupsActions'
import { submitGetGames } from '/views/all-games/allGamesActions'
import { submitGetSettings } from '/views/admin/adminActions'

import AllSignupsList from '/views/all-signups/components/AllSignupsList'

type Props = {
  t: Function,
  onSubmitGetGames: Function,
  games: Array<any>,
  onSubmitGetResults: Function,
  onSubmitGetSettings: Function,
  results: Array<any>,
  signupTime: string,
}

class AllSignupsView extends React.Component<Props> {
  props: Props
  componentDidMount() {
    this.props.onSubmitGetGames()
    this.props.onSubmitGetSettings()
    this.props.onSubmitGetResults()
  }

  render() {
    const { games, t, results, signupTime } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    if (!results || results.length === 0 || !games || games.length === 0) {
      return <p>{t('noResults')}</p>
    }

    let selectedResult = []
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].startTime === signupTime) {
        selectedResult = results[i].result
        break
      }
    }

    if (!selectedResult || selectedResult === 0) {
      return <p>{t('noResults')}</p>
    }

    games.forEach(game => {
      selectedResult.forEach(result => {
        if (game.id === result.enteredGame.id) {
          Object.assign(result.enteredGame, game)
        }
      })
    })

    const formattedDate = moment(signupTime).format('DD.M.YYYY HH:mm')

    return (
      <div>
        <p className="page-title">
          {t('signupResultsfor')} {formattedDate}
        </p>
        <AllSignupsList results={selectedResult} />
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

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import moment from 'moment'

import { submitGetResults } from '../all-signups/allSignupsActions'
import { submitGetGames } from '../all-games/allGamesActions'
import { submitGetSettings } from '../admin/adminActions'

import AllSignupsList from './components/AllSignupsList'
// import GameDetails from '../../components/GameDetails';

class AllSignupsView extends React.Component {
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

    let selectedResult
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].time === signupTime) {
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

    const formattedDate = moment.utc(signupTime).format('DD.M.YYYY HH:mm')

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

AllSignupsView.propTypes = {
  t: PropTypes.func.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  onSubmitGetResults: PropTypes.func.isRequired,
  onSubmitGetSettings: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  signupTime: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    results: state.allSignups.results,
    signupTime: state.admin.signupTime,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetResults: () => dispatch(submitGetResults()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
  }
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AllSignupsView)
)

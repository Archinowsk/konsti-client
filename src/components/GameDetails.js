/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { submitUpdateBlacklist } from 'views/admin/adminActions'
import { submitUpdateFavorites } from 'views/my-games/myGamesActions'
import FeedbackForm from 'components/FeedbackForm'
import GameInfo from 'components/GameInfo'
import Loading from 'components/Loading'

type Props = {
  blacklistedGames: Array<any>,
  favoritedGames: Array<any>,
  games: Array<any>,
  history: Object,
  loggedIn: boolean,
  match: Object,
  onSubmitUpdateBlacklist: Function,
  onSubmitUpdateFavorites: Function,
  userGroup: string,
  username: string,
}

type State = {
  blacklisted: boolean,
  favorited: boolean,
  game: Object,
  loading: boolean,
  submitting: boolean,
}

const GameDetails = (props: Props, state: State) => {
  const {
    blacklistedGames,
    favoritedGames,
    games,
    history,
    loggedIn,
    match,
    onSubmitUpdateBlacklist,
    onSubmitUpdateFavorites,
    userGroup,
    username,
  } = props

  const { t } = useTranslation()

  const game = games.find(game => game.id === match.params.id)

  const [blacklisted, setBlacklisted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [favorited, setFavorited] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    checkGameState()
    setLoading(false)
  })

  const checkGameState = () => {
    if (!game || !game.id) return

    // Check if in favorites
    for (let i = 0; i < favoritedGames.length; i += 1) {
      if (favoritedGames[i].id === game.id) {
        setFavorited(true)
        break
      }
    }

    // Check if blacklisted
    for (let i = 0; i < blacklistedGames.length; i += 1) {
      if (blacklistedGames[i].id === game.id) {
        setBlacklisted(true)
        break
      }
    }
  }

  // Find selected game index
  const findGame = (id, array) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === id) {
        return i
      }
    }
    return -1
  }

  // Favorite / unfavorite clicked
  const addFavoriteEvent = async action => {
    if (!game || !game.id) return

    setSubmitting(true)
    const gameIndex = findGame(game.id, favoritedGames)
    const allFavoritedGames = favoritedGames.slice()

    if (action === 'add') {
      if (gameIndex === -1) {
        allFavoritedGames.push(game)
      }
    } else if (action === 'del') {
      if (gameIndex > -1) {
        allFavoritedGames.splice(gameIndex, 1)
      }
    }

    const favoriteData = {
      username: username,
      favoritedGames: allFavoritedGames,
    }

    let response = null
    try {
      response = await onSubmitUpdateFavorites(favoriteData)
    } catch (error) {
      console.log(`onSubmitUpdateFavorites error: ${error}`)
    }

    setSubmitting(false)

    if (response && response.status === 'success') {
      if (action === 'add') {
        setFavorited(true)
      } else if (action === 'del') {
        setFavorited(false)
      }
    }
  }

  // Hide / unhide clicked
  const addBlacklistEvent = async action => {
    if (!game || !game.id) return

    setSubmitting(true)
    const gameIndex = findGame(game.id, blacklistedGames)
    const allBlacklistedGames = blacklistedGames.slice()

    if (action === 'add') {
      if (gameIndex === -1) {
        allBlacklistedGames.push({ id: game.id })
      }
    } else if (action === 'del') {
      if (gameIndex > -1) {
        allBlacklistedGames.splice(gameIndex, 1)
      }
    }

    // Send only game IDs to API
    const blacklistedGameIds = []
    allBlacklistedGames.forEach(blacklistedGame => {
      blacklistedGameIds.push({ id: blacklistedGame.id })
    })

    const blacklistData = {
      blacklistedGames: blacklistedGameIds,
    }

    let response = null
    try {
      response = await onSubmitUpdateBlacklist(blacklistData)
    } catch (error) {
      console.log(`onSubmitUpdateBlacklist error: ${error}`)
    }

    setSubmitting(false)

    if (response && response.status === 'success') {
      if (action === 'add') {
        setBlacklisted(true)
      } else if (action === 'del') {
        setBlacklisted(false)
      }
    }
  }

  return (
    <div className='game-details'>
      {loading && <Loading />}
      {!loading && (
        <React.Fragment>
          <button
            onClick={() => {
              if (history.action === 'PUSH') {
                history.goBack()
              } else {
                history.push('/')
              }
            }}
          >
            {t('button.back')}
          </button>

          {favorited && loggedIn && userGroup === 'user' && (
            <button
              disabled={submitting}
              onClick={() => addFavoriteEvent('del')}
            >
              {t('button.removeFavorite')}
            </button>
          )}

          {!favorited && loggedIn && userGroup === 'user' && (
            <button
              disabled={submitting}
              onClick={() => addFavoriteEvent('add')}
            >
              {t('button.favorite')}
            </button>
          )}

          {blacklisted && loggedIn && userGroup === 'admin' && (
            <button
              disabled={submitting}
              onClick={() => addBlacklistEvent('del')}
            >
              {t('button.unhide')}
            </button>
          )}

          {!blacklisted && loggedIn && userGroup === 'admin' && (
            <button
              disabled={submitting}
              onClick={() => addBlacklistEvent('add')}
            >
              {t('button.hide')}
            </button>
          )}

          <GameInfo game={game} />
          {loggedIn && <FeedbackForm game={game} />}
        </React.Fragment>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    favoritedGames: state.myGames.favoritedGames,
    blacklistedGames: state.admin.blacklistedGames,
    loggedIn: state.login.loggedIn,
    games: state.allGames.games,
    userGroup: state.login.userGroup,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitUpdateFavorites: id => dispatch(submitUpdateFavorites(id)),
    onSubmitUpdateBlacklist: id => dispatch(submitUpdateBlacklist(id)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GameDetails)
)

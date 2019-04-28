/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { submitUpdateHidden } from 'views/admin/adminActions'
import { submitUpdateFavorites } from 'views/my-games/myGamesActions'
import FeedbackForm from 'components/FeedbackForm'
import GameInfo from 'components/GameInfo'
import Loading from 'components/Loading'
import type { Game } from 'flow/game.flow'

type Props = {
  hiddenGames: Array<Game>,
  favoritedGames: Array<Game>,
  games: Array<Game>,
  history: Object,
  loggedIn: boolean,
  match: Object,
  onSubmitUpdateHidden: Function,
  onSubmitUpdateFavorites: Function,
  userGroup: string,
  username: string,
}

type State = {
  hidden: boolean,
  favorited: boolean,
  loading: boolean,
  submitting: boolean,
}

const GameDetails = (props: Props, state: State) => {
  const {
    hiddenGames,
    favoritedGames,
    games,
    history,
    loggedIn,
    match,
    onSubmitUpdateHidden,
    onSubmitUpdateFavorites,
    userGroup,
    username,
  } = props

  const { t } = useTranslation()

  const game = games.find(game => game.gameId === match.params.id)

  const [hidden, setHidden] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [favorited, setFavorited] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    checkGameState()
    setLoading(false)
  })

  if (!game || !game.gameId) return

  const checkGameState = () => {
    if (!game || !game.gameId) return

    // Check if in favorites
    for (let i = 0; i < favoritedGames.length; i += 1) {
      if (favoritedGames[i].gameId === game.gameId) {
        setFavorited(true)
        break
      }
    }

    // Check if hidden
    for (let i = 0; i < hiddenGames.length; i += 1) {
      if (hiddenGames[i].gameId === game.gameId) {
        setHidden(true)
        break
      }
    }
  }

  // Find selected game index
  const findGame = (gameId, array) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].gameId === gameId) {
        return i
      }
    }
    return -1
  }

  // Favorite / unfavorite clicked
  const addFavoriteEvent = async action => {
    if (!game || !game.gameId) return

    setSubmitting(true)
    const gameIndex = findGame(game.gameId, favoritedGames)
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
  const addHiddenEvent = async action => {
    if (!game || !game.gameId) return

    setSubmitting(true)
    const gameIndex = findGame(game.gameId, hiddenGames)
    const allHiddenGames = hiddenGames.slice()

    if (action === 'add') {
      if (gameIndex === -1) {
        allHiddenGames.push(game)
      }
    } else if (action === 'del') {
      if (gameIndex > -1) {
        allHiddenGames.splice(gameIndex, 1)
      }
    }

    // Send only game IDs to API
    const hiddenGameIds = []
    allHiddenGames.forEach(hiddenGame => {
      hiddenGameIds.push({ gameId: hiddenGame.gameId })
    })

    const hiddenData = {
      hiddenGames: hiddenGameIds,
    }

    let response = null
    try {
      response = await onSubmitUpdateHidden(hiddenData)
    } catch (error) {
      console.log(`onSubmitUpdateHidden error: ${error}`)
    }

    setSubmitting(false)

    if (response && response.status === 'success') {
      if (action === 'add') {
        setHidden(true)
      } else if (action === 'del') {
        setHidden(false)
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

          {hidden && loggedIn && userGroup === 'admin' && (
            <button disabled={submitting} onClick={() => addHiddenEvent('del')}>
              {t('button.unhide')}
            </button>
          )}

          {!hidden && loggedIn && userGroup === 'admin' && (
            <button disabled={submitting} onClick={() => addHiddenEvent('add')}>
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
    hiddenGames: state.admin.hiddenGames,
    loggedIn: state.login.loggedIn,
    games: state.allGames.games,
    userGroup: state.login.userGroup,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitUpdateFavorites: id => dispatch(submitUpdateFavorites(id)),
    onSubmitUpdateHidden: id => dispatch(submitUpdateHidden(id)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GameDetails)
)

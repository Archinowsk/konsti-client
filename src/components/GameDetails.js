/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { submitUpdateHidden } from 'views/admin/adminActions'
import { submitUpdateFavorites } from 'views/my-games/myGamesActions'
import { FeedbackForm } from 'components/FeedbackForm'
import { GameInfo } from 'components/GameInfo'
import { Loading } from 'components/Loading'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {|
  history: Object,
  match: Object,
|}

const GameDetails: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { history, match } = props

  const username: string = useSelector(state => state.login.username)

  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const userGroup: string = useSelector(state => state.login.userGroup)
  const favoritedGames: $ReadOnlyArray<Game> = useSelector(
    state => state.myGames.favoritedGames
  )
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  )
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const game = games.find(game => game.gameId === match.params.id)

  const [hidden, setHidden]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = React.useState(false)
  const [favorited, setFavorited]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = React.useState(false)
  const [submitting, setSubmitting]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = React.useState(false)
  const [loading, setLoading]: [
    boolean,
    ((boolean => boolean) | boolean) => void
  ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    checkGameState()
    setLoading(false)
  })

  const checkGameState = () => {
    if (!game || !game.gameId) return

    // Check if in favorites
    favoritedGames.find(favoritedGameg => {
      if (favoritedGameg.gameId === game.gameId) {
        setFavorited(true)
      }
    })

    // Check if hidden
    hiddenGames.find(hiddenGame => {
      if (hiddenGame.gameId === game.gameId) {
        setHidden(true)
      }
    })
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
      response = await dispatch(submitUpdateFavorites(favoriteData))
    } catch (error) {
      console.log(`onSubmitUpdateFavorites error:`, error)
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

    let response = null
    try {
      response = await dispatch(submitUpdateHidden(allHiddenGames))
    } catch (error) {
      console.log(`onSubmitUpdateHidden error`, error)
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

      {loading && <Loading />}

      {!loading && !game && (
        <p>
          {t('invalidGameId')} {match.params.id}.
        </p>
      )}

      {!loading && game && (
        <React.Fragment>
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

export default withRouter(GameDetails)

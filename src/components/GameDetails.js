/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { submitUpdateBlacklist } from 'views/admin/adminActions'
import { submitUpdateFavorites } from 'views/my-games/myGamesActions'
import FeedbackForm from 'components/FeedbackForm'
import GameInfo from 'components/GameInfo'

type Props = {
  t: Function,
  games: Array<any>,
  match: Object,
  history: Object,
  onSubmitUpdateFavorites: Function,
  username: string,
  favoritedGames: Array<any>,
  blacklistedGames: Array<any>,
  loggedIn: boolean,
  userGroup: string,
  onSubmitUpdateBlacklist: Function,
}

type State = {
  blacklisted: boolean,
  hidden: boolean,
  username: string,
  game: Object,
  submitting: boolean,
  favorited: boolean,
}

class GameDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { games, match, username } = this.props

    // Get the open game from games list
    const game = games.filter(game => {
      return game.id === match.params.id
    })

    this.state = {
      blacklisted: false,
      hidden: false,
      username: username,
      game: game[0],
      submitting: false,
      favorited: false,
    }
  }

  componentDidMount() {
    this.checkGameState()
  }

  checkGameState = () => {
    const { game } = this.state
    const { favoritedGames, blacklistedGames } = this.props
    // Check if in favorites
    for (let i = 0; i < favoritedGames.length; i += 1) {
      if (favoritedGames[i].id === game.id) {
        this.setState({ favorited: true })
        break
      }
    }

    // Check if blacklisted
    for (let i = 0; i < blacklistedGames.length; i += 1) {
      if (blacklistedGames[i].id === game.id) {
        this.setState({ blacklisted: true })
        break
      }
    }
  }

  // Find selected game index
  findGame = (id, array) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === id) {
        return i
      }
    }
    return -1
  }

  // Favorite / unfavorite clicked
  addFavoriteEvent = async action => {
    const { game, username } = this.state
    const { favoritedGames, onSubmitUpdateFavorites } = this.props

    this.setState({ submitting: true })
    const gameIndex = this.findGame(game.id, favoritedGames)
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

    this.setState({ submitting: false })

    if (response && response.status === 'success') {
      if (action === 'add') {
        this.setState({ favorited: true })
      } else if (action === 'del') {
        this.setState({ favorited: false })
      }
    }
  }

  // Hide / unhide clicked
  addBlacklistEvent = async action => {
    const { game } = this.state
    const { blacklistedGames, onSubmitUpdateBlacklist } = this.props

    this.setState({ submitting: true })
    const gameIndex = this.findGame(game.id, blacklistedGames)
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

    this.setState({ submitting: false })

    if (response && response.status === 'success') {
      if (action === 'add') {
        this.setState({ blacklisted: true })
      } else if (action === 'del') {
        this.setState({ blacklisted: false })
      }
    }
  }

  render() {
    const { t, history, loggedIn, userGroup } = this.props
    const { game, favorited, submitting, blacklisted } = this.state

    return (
      <div className="game-details">
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

        {favorited &&
          loggedIn &&
          userGroup === 'user' && (
            <button
              disabled={submitting}
              onClick={() => this.addFavoriteEvent('del')}
            >
              {t('button.removeFavorite')}
            </button>
          )}

        {!favorited &&
          loggedIn &&
          userGroup === 'user' && (
            <button
              disabled={submitting}
              onClick={() => this.addFavoriteEvent('add')}
            >
              {t('button.favorite')}
            </button>
          )}

        {blacklisted &&
          loggedIn &&
          userGroup === 'admin' && (
            <button
              disabled={submitting}
              onClick={() => this.addBlacklistEvent('del')}
            >
              {t('button.unhide')}
            </button>
          )}

        {!blacklisted &&
          loggedIn &&
          userGroup === 'admin' && (
            <button
              disabled={submitting}
              onClick={() => this.addBlacklistEvent('add')}
            >
              {t('button.hide')}
            </button>
          )}

        <GameInfo game={game} />
        {loggedIn && <FeedbackForm game={game} />}
      </div>
    )
  }
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
  withNamespaces()(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(GameDetails)
  )
)

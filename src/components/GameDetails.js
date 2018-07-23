/* @flow */
import React from 'react'
import moment from 'moment'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postFeedback } from 'services/feedbackServices'
import { submitUpdateBlacklist } from 'views/admin/adminActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import { submitUpdateFavorites } from 'views/my-games/myGamesActions'

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
  onSubmitGetGames: Function,
  userGroup: string,
  onSubmitUpdateBlacklist: Function,
}

type State = {
  blacklisted: boolean,
  hidden: boolean,
  username: string,
  game: Object,
  submitting: boolean,
  feedbackValue: string,
  feedbackSent: boolean,
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
      feedbackValue: '',
      feedbackSent: false,
      favorited: false,
    }
  }

  componentDidMount() {
    const { game } = this.state
    const { favoritedGames, blacklistedGames, onSubmitGetGames } = this.props

    onSubmitGetGames()

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
  findGame(id, array) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === id) {
        return i
      }
    }
    return -1
  }

  // Favorite / unfavorite clicked
  async addFavoriteEvent(action) {
    const { game, username } = this.state
    const { favoritedGames, onSubmitUpdateFavorites } = this.props

    this.setState({ submitting: true })
    const gameIndex = this.findGame(game.id, favoritedGames)
    const allFavoritedGames = favoritedGames.slice()

    if (action === 'add') {
      if (gameIndex === -1) {
        allFavoritedGames.push({ id: game.id })
      }
    } else if (action === 'del') {
      if (gameIndex > -1) {
        allFavoritedGames.splice(gameIndex, 1)
      }
    }

    // Send only game IDs to API
    const favoritedGameIds = []
    allFavoritedGames.forEach(favoritedGame => {
      favoritedGameIds.push({ id: favoritedGame.id })
    })

    const favoriteData = {
      username: username,
      favoritedGames: favoritedGameIds,
    }

    let response = null
    try {
      response = await onSubmitUpdateFavorites(favoriteData)

      this.setState({ submitting: false })
      if (response.status === 'success') {
        if (action === 'add') {
          this.setState({ favorited: true })
        } else if (action === 'del') {
          this.setState({ favorited: false })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Hide / unhide clicked
  async addBlacklistEvent(action) {
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
      this.setState({ submitting: false })
      if (response.status === 'success') {
        if (action === 'add') {
          this.setState({ blacklisted: true })
        } else if (action === 'del') {
          this.setState({ blacklisted: false })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Hide / unhide clicked
  async sendFeedbackEvent() {
    const { game, feedbackValue } = this.state

    this.setState({ submitting: true })

    const feedbackData = {
      id: game.id,
      feedback: feedbackValue,
    }

    try {
      await postFeedback(feedbackData)
      this.setState({ feedbackSent: true, submitting: false })
    } catch (error) {}
  }

  render() {
    const { t, history, loggedIn, games, userGroup } = this.props
    const {
      game,
      favorited,
      submitting,
      blacklisted,
      feedbackValue,
      feedbackSent,
    } = this.state

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    const tagsList = []

    if (game.noLanguage) {
      tagsList.push(<li key={'noLanguage'}>{t(`gameTags.noLanguage`)}</li>)
    }

    if (game.englishOk) {
      tagsList.push(<li key={'englishOk'}>{t(`gameTags.englishOk`)}</li>)
    }

    if (game.childrenFriendly) {
      tagsList.push(
        <li key={'childrenFriendly'}>{t(`gameTags.childrenFriendly`)}</li>
      )
    }

    if (game.ageRestricted) {
      tagsList.push(
        <li key={'ageRestricted'}>{t(`gameTags.ageRestricted`)}</li>
      )
    }

    if (game.beginnerFriendly) {
      tagsList.push(
        <li key={'beginnerFriendly'}>{t(`gameTags.beginnerFriendly`)}</li>
      )
    }

    if (game.intendedForExperiencedParticipants) {
      tagsList.push(
        <li key={'intendedForExperiencedParticipants'}>
          {t(`gameTags.intendedForExperiencedParticipants`)}
        </li>
      )
    }

    let genresList = []
    if (game.genres) {
      genresList = game.genres.map(genre => (
        <li key={genre}>{t(`genre.${genre}`)}</li>
      ))
    }

    let stylesList = []
    if (game.styles) {
      stylesList = game.styles.map(style => (
        <li key={style}>{t(`gameStyle.${style}`)}</li>
      ))
    }

    const formattedStartTime = moment(game.startTime).format('dddd HH:mm')

    const formattedEndTime = moment(game.endTime).format('HH:mm')

    const handleChange = event => {
      this.setState({ feedbackValue: event.target.value })
    }

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

        {game.title && (
          <div className="game-details-row">
            <span className="game-details-title">{t('gameInfo.title')}</span>
            {game.title}
          </div>
        )}
        {game.people && (
          <div className="game-details-row">
            <span className="game-details-title">
              {t('gameInfo.gamemaster')}
            </span>
            {game.people}
          </div>
        )}
        {genresList.length > 0 && (
          <div className="game-details-row">
            <span className="game-details-title">{t('gameInfo.genres')}</span>
            <ul>{genresList}</ul>
          </div>
        )}
        {tagsList.length > 0 && (
          <div className="game-details-row">
            <span className="game-details-title">{t('gameInfo.tags')}</span>
            <ul>{tagsList}</ul>
          </div>
        )}
        {game.mins && (
          <div className="game-details-row">
            <span className="game-details-title">{t('gameInfo.runTime')}</span>
            {formattedStartTime} - {formattedEndTime} (
            {game.mins / 60} {t('hours')})
          </div>
        )}
        {game.description && (
          <div className="game-details-row">
            <span className="game-details-title">
              {t('gameInfo.description')}
            </span>
            {game.description}
          </div>
        )}
        {game.gameSystem && (
          <div className="game-details-row">
            <span className="game-details-title">
              {t('gameInfo.gamesystem')}
            </span>
            {game.gameSystem}
          </div>
        )}
        {stylesList.length > 0 && (
          <div className="game-details-row">
            <span className="game-details-title">
              {t('gameInfo.gameStyles')}
            </span>
            <ul>{stylesList}</ul>
          </div>
        )}
        {game.location && (
          <div className="game-details-row">
            <span className="game-details-title">{t('gameInfo.location')}</span>
            {game.location}
          </div>
        )}
        {game.minAttendance &&
          game.maxAttendance && (
            <div className="game-details-row">
              <span className="game-details-title">
                {t('gameInfo.numberOfPlayers')}
              </span>
              {game.minAttendance} - {game.maxAttendance}
            </div>
          )}

        {loggedIn && (
          <textarea
            value={feedbackValue}
            onChange={handleChange}
            className="feedback-textarea"
            rows="4"
          />
        )}
        {feedbackSent && <p>{t('button.feedbackSent')}</p>}
        {loggedIn && (
          <p>
            <button
              disabled={submitting}
              onClick={() => this.sendFeedbackEvent()}
            >
              {t('button.sendFeedback')}
            </button>
          </p>
        )}
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
    onSubmitGetGames: () => dispatch(submitGetGames()),
  }
}

export default withRouter(
  translate()(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(GameDetails)
  )
)

/* @flow */
import React from 'react'
import moment from 'moment'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postFeedback } from '/utils/api'
import { submitUpdateBlacklist } from '/views/admin/adminActions'
import { submitGetGames } from '/views/all-games/allGamesActions'
import { submitUpdateFavorites } from '/views/my-games/myGamesActions'

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

    this.state = {
      blacklisted: false,
      hidden: false,
      username: this.props.username,
      game: {},
      submitting: false,
      feedbackValue: '',
      feedbackSent: false,
      favorited: false,
    }

    // Get the open game from games list
    const gameById = game =>
      game.id === parseInt(this.props.match.params.id, 10)
    const game = this.props.games.find(gameById)
    this.setState({ game })
  }

  props: Props

  componentDidMount() {
    this.props.onSubmitGetGames()

    // Check if in favorites
    for (let i = 0; i < this.props.favoritedGames.length; i += 1) {
      if (this.props.favoritedGames[i].id === this.state.game.id) {
        this.setState({ favorited: true })
        break
      }
    }

    // Check if blacklisted
    for (let i = 0; i < this.props.blacklistedGames.length; i += 1) {
      if (this.props.blacklistedGames[i].id === this.state.game.id) {
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
    this.setState({ submitting: true })
    const gameIndex = this.findGame(
      this.state.game.id,
      this.props.favoritedGames
    )
    const allFavoritedGames = this.props.favoritedGames.slice()

    if (action === 'add') {
      if (gameIndex === -1) {
        allFavoritedGames.push({ id: this.state.game.id })
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
      username: this.state.username,
      favoritedGames: favoritedGameIds,
    }

    let response = null
    try {
      response = await this.props.onSubmitUpdateFavorites(favoriteData)

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
    this.setState({ submitting: true })
    const gameIndex = this.findGame(
      this.state.game.id,
      this.props.blacklistedGames
    )
    const allBlacklistedGames = this.props.blacklistedGames.slice()

    if (action === 'add') {
      if (gameIndex === -1) {
        allBlacklistedGames.push({ id: this.state.game.id })
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
      response = await this.props.onSubmitUpdateBlacklist(blacklistData)
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
    this.setState({ submitting: true })

    const feedbackData = {
      id: this.state.game.id,
      feedback: this.state.feedbackValue,
    }

    try {
      await postFeedback(feedbackData)
      this.setState({ feedbackSent: true, submitting: false })
    } catch (error) {}
  }

  render() {
    const { t, history, loggedIn, games, userGroup } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    const tagsList = this.state.game.tags.map(tag => <li key={tag}>{tag}</li>)

    const gamemastersList = this.state.game.people.map(person => (
      <li key={person}>{person}</li>
    ))

    const attributesList = this.state.game.attributes.map(attribute => (
      <li key={attribute}>{attribute}</li>
    ))

    const formattedDate = moment
      .utc(this.state.game.date)
      .format('DD.M.YYYY HH:mm')

    const handleChange = event => {
      this.setState({ feedbackValue: event.target.value })
    }

    return (
      <div>
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

        {this.state.favorited &&
          loggedIn &&
          userGroup === 'user' && (
            <button
              disabled={this.state.submitting}
              onClick={() => this.addFavoriteEvent('del')}
            >
              {t('button.removeFavorite')}
            </button>
          )}

        {!this.state.favorited &&
          loggedIn &&
          userGroup === 'user' && (
            <button
              disabled={this.state.submitting}
              onClick={() => this.addFavoriteEvent('add')}
            >
              {t('button.favorite')}
            </button>
          )}

        {this.state.blacklisted &&
          loggedIn &&
          userGroup === 'admin' && (
            <button
              disabled={this.state.submitting}
              onClick={() => this.addBlacklistEvent('del')}
            >
              {t('button.unhide')}
            </button>
          )}

        {!this.state.blacklisted &&
          loggedIn &&
          userGroup === 'admin' && (
            <button
              disabled={this.state.submitting}
              onClick={() => this.addBlacklistEvent('add')}
            >
              {t('button.hide')}
            </button>
          )}

        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.title')}</span>
          {this.state.game.title}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.programType')}
          </span>
          <ul>{attributesList}</ul>
        </div>
        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.date')}</span>
          {formattedDate}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.description')}
          </span>
          {this.state.game.description}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.gamesystem')}</span>
          {this.state.game.notes}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.location')}</span>
          {this.state.game.location}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.numberOfPlayers')}
          </span>
          {this.state.game.minAttendance} - {this.state.game.maxAttendance}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.duration')}</span>
          {this.state.game.mins / 60} {t('hours')}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.gamemaster')}</span>
          <ul>{gamemastersList}</ul>
        </div>
        {/*
        <div className="game-details-row">
          {t('gameInfo.table')}: {this.state.game.table}
        </div>
        */}
        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.tags')}</span>
          <ul>{tagsList}</ul>
        </div>

        {loggedIn && (
          <textarea
            value={this.state.feedbackValue}
            onChange={handleChange}
            className="feedback-textarea"
            rows="4"
          />
        )}
        {this.state.feedbackSent && <p>{t('button.feedbackSent')}</p>}
        {loggedIn && (
          <p>
            <button
              disabled={this.state.submitting}
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

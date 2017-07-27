import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  submitUpdateFavorites,
  // submitSendFeedback,
} from '../views/my-games/MyGamesActions';
import { submitUpdateBlacklist } from '../views/admin/AdminActions';
import { submitGetGames } from '../views/all-games/AllGamesActions';
import { postFeedback } from '../app/api';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blacklisted: false,
      hidden: false,
      username: this.props.username,
      game: {},
      submitting: false,
      feedbackValue: '',
      feedbackSent: false,
    };
  }

  componentWillMount() {
    // Get the open game from games list
    const gameById = game =>
      game.id === parseInt(this.props.match.params.id, 10);
    const game = this.props.games.find(gameById);
    this.setState({ game });
  }

  componentDidMount() {
    /*
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    */
    this.props.onSubmitGetGames();

    // Check if in favorites
    for (let i = 0; i < this.props.favoritedGames.length; i += 1) {
      if (this.props.favoritedGames[i].id === this.state.game.id) {
        this.setState({ favorited: true }); // eslint-disable-line react/no-did-mount-set-state
        break;
      }
    }

    // Check if blacklisted
    for (let i = 0; i < this.props.blacklistedGames.length; i += 1) {
      if (this.props.blacklistedGames[i].id === this.state.game.id) {
        this.setState({ blacklisted: true }); // eslint-disable-line react/no-did-mount-set-state
        break;
      }
    }
  }

  // Find selected game index
  findGame(id, array) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  // Favorite / unfavorite clicked
  addFavoriteEvent(action) {
    this.setState({ submitting: true });
    const gameIndex = this.findGame(
      this.state.game.id,
      this.props.favoritedGames
    );
    const allFavoritedGames = this.props.favoritedGames.slice();

    if (action === 'add') {
      if (gameIndex === -1) {
        allFavoritedGames.push({ id: this.state.game.id });
      }
    } else if (action === 'del') {
      if (gameIndex > -1) {
        allFavoritedGames.splice(gameIndex, 1);
      }
    }

    // Send only game IDs to API
    const favoritedGameIds = [];
    allFavoritedGames.forEach(favoritedGame => {
      favoritedGameIds.push({ id: favoritedGame.id });
    });

    const favoriteData = {
      username: this.state.username,
      favoritedGames: favoritedGameIds,
    };

    this.props.onSubmitUpdateFavorites(favoriteData).then(response => {
      this.setState({ submitting: false });
      if (response.status === 'success') {
        if (action === 'add') {
          this.setState({ favorited: true });
        } else if (action === 'del') {
          this.setState({ favorited: false });
        }
      }
    });
  }

  // Hide / unhide clicked
  addBlacklistEvent(action) {
    this.setState({ submitting: true });
    const gameIndex = this.findGame(
      this.state.game.id,
      this.props.blacklistedGames
    );
    const allBlacklistedGames = this.props.blacklistedGames.slice();

    if (action === 'add') {
      if (gameIndex === -1) {
        allBlacklistedGames.push({ id: this.state.game.id });
      }
    } else if (action === 'del') {
      if (gameIndex > -1) {
        allBlacklistedGames.splice(gameIndex, 1);
      }
    }

    // Send only game IDs to API
    const blacklistedGameIds = [];
    allBlacklistedGames.forEach(blacklistedGame => {
      blacklistedGameIds.push({ id: blacklistedGame.id });
    });

    const blacklistData = {
      blacklistedGames: blacklistedGameIds,
    };

    this.props.onSubmitUpdateBlacklist(blacklistData).then(response => {
      this.setState({ submitting: false });
      if (response.status === 'success') {
        if (action === 'add') {
          this.setState({ blacklisted: true });
        } else if (action === 'del') {
          this.setState({ blacklisted: false });
        }
      }
    });
  }

  // Hide / unhide clicked
  sendFeedbackEvent() {
    this.setState({ submitting: true });

    const feedbackData = {
      id: this.state.game.id,
      feedback: this.state.feedbackValue,
    };

    postFeedback(feedbackData).then(() => {
      // this.setState({ feedbackValue: '' });
      this.setState({ feedbackSent: true });
      this.setState({ submitting: false });
    });

    // this.props.onSubmitSendFeedback(feedbackData).then(response => {
    // this.setState({ submitting: false });
    // });
  }

  render() {
    const { t, history, loggedIn, games, userGroup } = this.props;

    if (!games || games.length === 0) {
      return (
        <p>
          {t('loading')}
        </p>
      );
    }

    const tagsList = this.state.game.tags.map(tag =>
      <li key={tag}>
        {tag}
      </li>
    );

    const gamemastersList = this.state.game.people.map(person =>
      <li key={person}>
        {person}
      </li>
    );

    const attributesList = this.state.game.attributes.map(attribute =>
      <li key={attribute}>
        {attribute}
      </li>
    );

    const formattedDate = moment
      .utc(this.state.game.date)
      .format('DD.M.YYYY HH:mm');

    const handleChange = event => {
      this.setState({ feedbackValue: event.target.value });
    };

    return (
      <div>
        <button
          onClick={() => {
            if (history.action === 'PUSH') {
              history.goBack();
            } else {
              history.push('/');
            }
          }}
        >
          {t('button.back')}
        </button>

        {this.state.favorited &&
          loggedIn &&
          userGroup === 'user' &&
          <button
            disabled={this.state.submitting}
            onClick={() => this.addFavoriteEvent('del')}
          >
            {t('button.removeFavorite')}
          </button>}

        {!this.state.favorited &&
          loggedIn &&
          userGroup === 'user' &&
          <button
            disabled={this.state.submitting}
            onClick={() => this.addFavoriteEvent('add')}
          >
            {t('button.favorite')}
          </button>}

        {this.state.blacklisted &&
          loggedIn &&
          userGroup === 'admin' &&
          <button
            disabled={this.state.submitting}
            onClick={() => this.addBlacklistEvent('del')}
          >
            {t('button.unhide')}
          </button>}

        {!this.state.blacklisted &&
          loggedIn &&
          userGroup === 'admin' &&
          <button
            disabled={this.state.submitting}
            onClick={() => this.addBlacklistEvent('add')}
          >
            {t('button.hide')}
          </button>}

        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.title')}
          </span>
          {this.state.game.title}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.programType')}
          </span>
          <ul>
            {attributesList}
          </ul>
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.date')}
          </span>
          {formattedDate}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.description')}
          </span>
          {this.state.game.description}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.gamesystem')}
          </span>
          {this.state.game.notes}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.location')}
          </span>
          {this.state.game.location}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.numberOfPlayers')}
          </span>
          {this.state.game.min_attendance} - {this.state.game.max_attendance}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">{t('gameInfo.duration')}</span>
          {this.state.game.mins / 60} {t('hours')}
        </div>
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.gamemaster')}
          </span>
          <ul>
            {gamemastersList}
          </ul>
        </div>
        {/*
        <div className="game-details-row">
          {t('gameInfo.table')}: {this.state.game.table}
        </div>
        */}
        <div className="game-details-row">
          <span className="game-details-title">
            {t('gameInfo.tags')}
          </span>
          <ul>
            {tagsList}
          </ul>
        </div>

        {loggedIn &&
          <textarea
            value={this.state.feedback}
            onChange={handleChange}
            className="feedback-textarea"
            rows="4"
          />}
        {this.state.feedbackSent &&
          <p>
            {t('button.feedbackSent')}
          </p>}
        {loggedIn &&
          <p>
            <button
              disabled={this.state.submitting}
              onClick={() => this.sendFeedbackEvent()}
            >
              {t('button.sendFeedback')}
            </button>
          </p>}
      </div>
    );
  }
}

GameDetails.propTypes = {
  t: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onSubmitUpdateFavorites: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  favoritedGames: PropTypes.array.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
  userGroup: PropTypes.string.isRequired,
  onSubmitUpdateBlacklist: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    username: state.login.username,
    favoritedGames: state.myGames.favoritedGames,
    blacklistedGames: state.admin.blacklistedGames,
    loggedIn: state.login.loggedIn,
    games: state.allGames.games,
    userGroup: state.login.userGroup,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitUpdateFavorites: id => dispatch(submitUpdateFavorites(id)),
    onSubmitUpdateBlacklist: id => dispatch(submitUpdateBlacklist(id)),
    onSubmitGetGames: () => dispatch(submitGetGames()),
    // onSubmitSendFeedback: feedbackData =>
    // dispatch(submitSendFeedback(feedbackData)),
  };
};

export default withRouter(
  translate()(connect(mapStateToProps, mapDispatchToProps)(GameDetails))
);

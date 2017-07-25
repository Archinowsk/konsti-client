import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { submitUpdateFavorites } from '../views/my-games/MyGamesActions';
import { submitGetGames } from '../views/all-games/AllGamesActions';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorited: false,
      username: this.props.username,
      game: {},
      submitting: false,
    };
  }

  componentWillMount() {
    const gameById = game =>
      game.id === parseInt(this.props.match.params.id, 10);
    const game = this.props.games.find(gameById);
    this.setState({ game });
  }

  componentDidMount() {
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }

    // Check if in favorites
    for (let i = 0; i < this.props.favoritedGames.length; i += 1) {
      if (this.props.favoritedGames[i].id === this.state.game.id) {
        this.setState({ favorited: true }); // eslint-disable-line react/no-did-mount-set-state
        break;
      }
    }
  }

  // Find selected game index
  findGame(id) {
    for (let i = 0; i < this.props.favoritedGames.length; i += 1) {
      if (this.props.favoritedGames[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  // Favorite / unfavorite clicked
  addFavoriteEvent(action) {
    this.setState({ submitting: true });
    const gameIndex = this.findGame(this.state.game.id);

    if (action === 'add') {
      if (gameIndex === -1) {
        this.props.favoritedGames.push({ id: this.state.game.id });
        this.setState({ favorited: true });
      }
    } else if (action === 'del') {
      if (gameIndex > -1) {
        this.props.favoritedGames.splice(gameIndex, 1);
        this.setState({ favorited: false });
      }
    }

    // Send only game IDs to API
    const favoritedGameIds = [];
    this.props.favoritedGames.forEach(favoritedGame => {
      favoritedGameIds.push({ id: favoritedGame.id });
    });

    const favoriteData = {
      username: this.state.username,
      favoritedGames: favoritedGameIds,
    };

    this.props.onSubmitUpdateFavorites(favoriteData).then(() => {
      this.setState({ submitting: false });
    });
  }

  render() {
    const { t, history, loggedIn, games } = this.props;

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
          <button
            disabled={this.state.submitting}
            onClick={() => this.addFavoriteEvent('del')}
          >
            {t('button.removeFavorite')}
          </button>}

        {!this.state.favorited &&
          loggedIn &&
          <button
            disabled={this.state.submitting}
            onClick={() => this.addFavoriteEvent('add')}
          >
            {t('button.favorite')}
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
  loggedIn: PropTypes.bool.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    username: state.login.username,
    favoritedGames: state.myGames.favoritedGames,
    loggedIn: state.login.loggedIn,
    games: state.allGames.games,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitUpdateFavorites: id => dispatch(submitUpdateFavorites(id)),
    onSubmitGetGames: () => dispatch(submitGetGames()),
  };
};

export default withRouter(
  translate()(connect(mapStateToProps, mapDispatchToProps)(GameDetails))
);

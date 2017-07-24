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
            history.goBack();
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

        <ul>
          <li>
            {t('gameInfo.title')}: {this.state.game.title}
          </li>
          <li>
            {t('gameInfo.programType')}:<ul> {attributesList}</ul>
          </li>
          <li>
            {t('gameInfo.date')}: {formattedDate}
          </li>
          <li>
            {t('gameInfo.description')}: {this.state.game.description}
          </li>
          <li>
            {t('gameInfo.location')}: {this.state.game.location}
          </li>
          <li>
            {t('gameInfo.numberOfPlayers')}: {this.state.game.min_attendance} -{' '}
            {this.state.game.max_attendance}
          </li>
          <li>
            {t('gameInfo.duration')}: {this.state.game.mins}
          </li>
          <li>
            {t('gameInfo.gamemaster')}:<ul> {gamemastersList}</ul>
          </li>
          <li>
            {t('gameInfo.table')}: {this.state.game.table}
          </li>
          <li>
            {t('gameInfo.tags')}:<ul>{tagsList}</ul>
          </li>
        </ul>
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

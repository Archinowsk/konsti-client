import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { submitGetUser } from './MyGamesActions';
import { submitGetGames } from '../all-games/AllGamesActions';

import MySignupsList from './components/MySignupsList';
import MyFavoritesList from './components/MyFavoritesList';

class MyGamesView extends React.Component {
  componentDidMount() {
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    this.props.onSubmitGetUser(this.props.username);
  }

  render() {
    const { signedGames, favoritedGames, games, t } = this.props;

    if (!games || games.length === 0) {
      return (
        <p>
          {t('loading')}
        </p>
      );
    }

    games.forEach(game => {
      signedGames.forEach(signedGame => {
        if (game.id === signedGame.id) {
          Object.assign(signedGame, game);
        }
      });

      favoritedGames.forEach(favoritedGame => {
        if (game.id === favoritedGame.id) {
          Object.assign(favoritedGame, game);
        }
      });
    });

    return (
      <div>
        <MySignupsList signedGames={signedGames} />
        <MyFavoritesList favoritedGames={favoritedGames} />
      </div>
    );
  }
}

MyGamesView.propTypes = {
  signedGames: PropTypes.array.isRequired,
  favoritedGames: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  onSubmitGetUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    signedGames: state.myGames.signedGames,
    favoritedGames: state.myGames.favoritedGames,
    username: state.login.username,
    games: state.allGames.games,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGetUser: username => dispatch(submitGetUser(username)),
    onSubmitGetGames: () => dispatch(submitGetGames()),
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(MyGamesView)
);

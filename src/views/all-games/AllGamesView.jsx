import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { translate } from 'react-i18next';

import { submitGetGames } from './AllGamesActions';
import { submitGetSettings } from '../admin/AdminActions';
import AllGamesList from './components/AllGamesList';
import GameDetails from '../../shared-components/GameDetails';

class AllGamesView extends React.Component {
  componentDidMount() {
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    this.props.onSubmitGetSettings();
  }

  render() {
    const { games, t, blacklistedGames } = this.props;

    if (!games || games.length === 0) {
      return (
        <p>
          {t('loading')}
        </p>
      );
    }

    const visibleGames = [];
    // Remove hidden games
    for (let i = 0; i < games.length; i += 1) {
      let match = false;

      for (let j = 0; j < blacklistedGames.length; j += 1) {
        if (games[i].id === blacklistedGames[j].id) {
          match = true;
          break;
        }
      }
      if (!match) {
        visibleGames.push(games[i]);
      }
    }

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props =>
              <AllGamesList
                {...props}
                games={visibleGames}
                blacklistedGames={blacklistedGames}
              />}
          />
          <Route
            exact
            path="/games"
            render={props =>
              <AllGamesList
                {...props}
                games={visibleGames}
                blacklistedGames={blacklistedGames}
              />}
          />
          <Route
            path="/games/:id"
            render={props =>
              <GameDetails
                {...props}
                games={visibleGames}
                blacklistedGames={blacklistedGames}
              />}
          />
        </Switch>
      </div>
    );
  }
}

AllGamesView.propTypes = {
  t: PropTypes.func.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
  onSubmitGetSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    blacklistedGames: state.admin.blacklistedGames,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AllGamesView)
);

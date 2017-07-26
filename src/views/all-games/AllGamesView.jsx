import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { translate } from 'react-i18next';

import { submitGetGames } from './AllGamesActions';
import AllGamesList from './components/AllGamesList';
import GameDetails from '../../shared-components/GameDetails';

class AllGamesView extends React.Component {
  componentDidMount() {
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
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

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props =>
              <AllGamesList
                {...props}
                games={games}
                blacklistedGames={blacklistedGames}
              />}
          />
          <Route
            exact
            path="/games"
            render={props =>
              <AllGamesList
                {...props}
                games={games}
                blacklistedGames={blacklistedGames}
              />}
          />
          <Route
            path="/games/:id"
            render={props =>
              <GameDetails
                {...props}
                games={games}
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
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AllGamesView)
);

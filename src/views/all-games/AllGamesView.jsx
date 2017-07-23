import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { submitGetGames } from './AllGamesActions';
import AllGamesList from './components/AllGamesList';
import GameDetails from '../../shared-components/GameDetails';

class AllGamesView extends React.Component {
  componentDidMount() {
    this.props.onSubmitGetGames();
  }

  render() {
    const { games } = this.props;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <AllGamesList {...props} games={games} />}
          />
          <Route
            exact
            path="/games"
            render={props => <AllGamesList {...props} games={games} />}
          />
          <Route
            exact
            path="/games/:id"
            render={props => <GameDetails {...props} games={games} />}
          />
        </Switch>
      </div>
    );
  }
}

AllGamesView.propTypes = {
  // t: PropTypes.func,
  onSubmitGetGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGetGames: () => dispatch(submitGetGames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllGamesView);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { translate } from 'react-i18next';

import { submitGetGames } from '../all-games/AllGamesActions';
import SignupList from './components/SignupList';
import GameDetails from '../../shared-components/GameDetails';

class SignupView extends React.Component {
  componentDidMount() {
    this.props.onSubmitGetGames();
  }

  render() {
    const { games, t } = this.props;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/signup"
            render={props => <SignupList {...props} games={games} />}
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

SignupView.propTypes = {
  t: PropTypes.func.isRequired,
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

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(SignupView)
);

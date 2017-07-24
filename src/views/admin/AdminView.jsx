import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import Blacklist from './components/Blacklist';
import { submitGamesUpdate, submitPlayersAssign } from './AdminActions';
import { submitGetGames } from '../all-games/AllGamesActions';

class AdminView extends React.Component {
  componentDidMount() {
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
  }

  render() {
    const {
      onSubmitGamesUpdate,
      onSubmitPlayersAssign,
      t,
      updateResponse,
      games,
    } = this.props;

    if (!games || games.length === 0) {
      return (
        <p>
          {t('loading')}
        </p>
      );
    }

    return (
      <div>
        <button
          onClick={() => {
            onSubmitGamesUpdate();
          }}
        >
          {t('button.updateDb')}
        </button>

        <button
          onClick={() => {
            onSubmitPlayersAssign();
          }}
        >
          {t('button.assignPlayers')}
        </button>

        {updateResponse.data.errors &&
          <p className="error">
            {updateResponse.data.message}
          </p>}

        <Blacklist games={games} />
      </div>
    );
  }
}

AdminView.propTypes = {
  onSubmitGamesUpdate: PropTypes.func.isRequired,
  onSubmitPlayersAssign: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateResponse: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  onSubmitGetGames: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    updateResponse: state.admin.updateResponse,
    games: state.allGames.games,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGamesUpdate: () => dispatch(submitGamesUpdate()),
    onSubmitPlayersAssign: () => dispatch(submitPlayersAssign()),
    onSubmitGetGames: () => dispatch(submitGetGames()),
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AdminView)
);

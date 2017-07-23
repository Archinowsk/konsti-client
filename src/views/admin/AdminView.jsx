import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import Blacklist from './components/Blacklist';
import { submitGamesUpdate, submitPlayersAssign } from './AdminActions';

const LoginView = props => {
  const {
    onSubmitGamesUpdate,
    onSubmitPlayersAssign,
    t,
    updateResponse,
    games,
  } = props;

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
};

LoginView.propTypes = {
  onSubmitGamesUpdate: PropTypes.func.isRequired,
  onSubmitPlayersAssign: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateResponse: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
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
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(LoginView)
);

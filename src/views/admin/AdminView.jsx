import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import Blacklist from './components/Blacklist';
import {
  submitGamesUpdate,
  submitPlayersAssign,
  submitGetSettings,
} from './AdminActions';
import { submitGetGames } from '../all-games/AllGamesActions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
    };
  }

  componentDidMount() {
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    this.props.onSubmitGetSettings();
  }

  render() {
    const {
      onSubmitGamesUpdate,
      onSubmitPlayersAssign,
      t,
      updateResponse,
      games,
      blacklistedGames,
    } = this.props;

    if (!games || games.length === 0) {
      return (
        <p>
          {t('loading')}
        </p>
      );
    }

    games.forEach(game => {
      blacklistedGames.forEach(blacklistedGame => {
        if (game.id === blacklistedGame.id) {
          Object.assign(blacklistedGame, game);
        }
      });
    });

    const submitUpdate = () => {
      this.setState({ submitting: true });

      onSubmitGamesUpdate().then(() => {
        this.setState({ submitting: false });
      });
    };

    const submitAssign = () => {
      this.setState({ submitting: true });

      onSubmitPlayersAssign().then(() => {
        this.setState({ submitting: false });
      });
    };

    return (
      <div>
        <button
          disabled={this.state.submitting}
          onClick={() => {
            submitUpdate();
          }}
        >
          {t('button.updateDb')}
        </button>

        <button
          disabled={this.state.submitting}
          onClick={() => {
            submitAssign();
          }}
        >
          {t('button.assignPlayers')}
        </button>

        {this.state.submitting &&
          <p>
            {t('loading')}
          </p>}

        {updateResponse.data.errors &&
          <p className="error">
            {updateResponse.data.message}
          </p>}

        <p>Select open signup</p>

        <Blacklist blacklistedGames={blacklistedGames} />
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
  onSubmitGetSettings: PropTypes.func.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    updateResponse: state.admin.updateResponse,
    games: state.allGames.games,
    blacklistedGames: state.admin.blacklistedGames,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGamesUpdate: () => dispatch(submitGamesUpdate()),
    onSubmitPlayersAssign: () => dispatch(submitPlayersAssign()),
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AdminView)
);

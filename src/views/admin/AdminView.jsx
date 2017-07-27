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
import { submitSelectDate } from '../signup/SignupActions';
import TimesDropdown from '../../shared-components/TimesDropdown';

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
      onSubmitSelectDate,
      date,
    } = this.props;

    if (!games || games.length === 0) {
      return (
        <p>
          {t('loading')}
        </p>
      );
    }

    // Assign game info to blacklisted games list
    games.forEach(game => {
      blacklistedGames.forEach(blacklistedGame => {
        if (game.id === blacklistedGame.id) {
          Object.assign(blacklistedGame, game);
        }
      });
    });

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

        <TimesDropdown
          games={visibleGames}
          onChange={onSubmitSelectDate}
          date={date}
        />

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
  onSubmitSelectDate: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    updateResponse: state.admin.updateResponse,
    games: state.allGames.games,
    blacklistedGames: state.admin.blacklistedGames,
    date: state.signup.date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitGamesUpdate: () => dispatch(submitGamesUpdate()),
    onSubmitPlayersAssign: () => dispatch(submitPlayersAssign()),
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
    onSubmitSelectDate: event => dispatch(submitSelectDate(event.target.value)),
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(AdminView)
);

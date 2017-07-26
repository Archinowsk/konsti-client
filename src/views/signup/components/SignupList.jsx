import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  submitSelectDate,
  submitSelectGame,
  submitDeselectGame,
  submitSignup,
  submitUpdatetGame,
} from '../SignupActions';

class SignupList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
    };
  }

  componentDidMount() {
    this.props.signedGames.forEach(signedGame => {
      this.props.onSubmitSelectGame(signedGame);
    });
  }

  render() {
    const {
      games,
      t,
      date,
      onSubmitSelectDate,
      onSubmitSelectGame,
      onSubmitDeselectGame,
      onSubmitSignup,
      selectedGames,
      username,
      signedGames,
      onSubmitUpdatetGame,
      blacklistedGames,
    } = this.props;

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

    const filteredGames = [];
    const startTimes = [];

    visibleGames.forEach(game => {
      startTimes.push(game.date);
    });

    const sortedTimes = [...new Set(startTimes)].sort();

    visibleGames.forEach(game => {
      if (game.date === date) {
        filteredGames.push(game);
      }
    });

    const findGame = id => {
      for (let i = 0; i < selectedGames.length; i += 1) {
        if (selectedGames[i].id === id) {
          return i;
        }
      }
      return -1;
    };

    const getSignupEvent = (id, event) => {
      const priority = parseInt(event.target.value, 10);
      const signupData = { id, priority };
      const gameIndex = findGame(id);

      if (priority !== 0) {
        // New game
        if (gameIndex === -1) {
          onSubmitSelectGame(signupData);
          // Existing game
        } else {
          console.log('change');
          onSubmitUpdatetGame(signupData);
        }
        // Remove existing game
      } else if (priority === 0) {
        if (gameIndex > -1) {
          onSubmitDeselectGame(gameIndex);
        }
      }
    };

    const onSubmitClick = () => {
      this.setState({ submitting: true });
      const signupData = { username, selectedGames };
      onSubmitSignup(signupData).then(() => {
        this.setState({ submitting: false });
      });
    };

    // TODO: Select each priority only once
    const GamesList = filteredGames.map(game => {
      let priority = 0;
      for (let i = 0; i < signedGames.length; i += 1) {
        if (signedGames[i].id === game.id) {
          priority = signedGames[i].priority;
          break;
        }
      }

      return (
        <p key={game.id}>
          <select
            defaultValue={priority}
            onChange={event => getSignupEvent(game.id, event)}
          >
            <option value="0">-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <Link to={`/games/${game.id}`}>
            {game.title}
          </Link>
        </p>
      );
    });

    // TODO: Only enable next open signup
    // Check current time and enable new timestamp
    // Show "signup starts xx:xx" on others
    // Toggle to show upcoming gameslots or all gameslots
    const TimesDropdown = sortedTimes.map(sortedTime => {
      // const formattedDate = formatDate(new Date(sortedTime));
      const formattedDate = moment.utc(sortedTime).format('DD.M.YYYY HH:mm');
      return (
        <option value={sortedTime} key={sortedTime}>
          {formattedDate}
        </option>
      );
    });

    return (
      <div>
        <select onChange={onSubmitSelectDate} value={date}>
          <option>
            {t('selectTime')}
          </option>
          {TimesDropdown}
        </select>
        <ul>
          {GamesList}
        </ul>
        <button disabled={this.state.submitting} onClick={onSubmitClick}>
          {t('button.signup')}
        </button>
      </div>
    );
  }
}

SignupList.propTypes = {
  t: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  selectedGames: PropTypes.array.isRequired,
  onSubmitSelectDate: PropTypes.func.isRequired,
  onSubmitSelectGame: PropTypes.func.isRequired,
  onSubmitDeselectGame: PropTypes.func.isRequired,
  onSubmitSignup: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  signedGames: PropTypes.array.isRequired,
  onSubmitUpdatetGame: PropTypes.func.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    date: state.signup.date,
    selectedGames: state.signup.selectedGames,
    username: state.login.username,
    signedGames: state.myGames.signedGames,
    blacklistedGames: state.admin.blacklistedGames,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitSelectDate: event => dispatch(submitSelectDate(event.target.value)),
    onSubmitSelectGame: id => dispatch(submitSelectGame(id)),
    onSubmitDeselectGame: gameIndex => dispatch(submitDeselectGame(gameIndex)),
    onSubmitSignup: signupData => dispatch(submitSignup(signupData)),
    onSubmitUpdatetGame: signupData => dispatch(submitUpdatetGame(signupData)),
  };
};

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(SignupList)
);

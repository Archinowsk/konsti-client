// @flow
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { usePrevious } from 'react-use';
import { timeFormatter } from 'utils/timeFormatter';
import {
  submitSignup,
  submitSelectedGames,
  submitSignupTime,
} from 'views/signup/signupActions';
// import { submitGetGamesAsync } from 'views/all-games/allGamesActions';
import { DragAndDropList } from 'views/signup/components/DragAndDropList';
import { sleep } from 'utils/sleep';
import { config } from 'config';
import type { StatelessFunctionalComponent, Element } from 'react';
import type { Game } from 'flow/game.flow';
import type { Signup } from 'flow/user.flow';

export type Props = {|
  games: $ReadOnlyArray<Game>,
  signupTimes: $ReadOnlyArray<string>,
  leader: boolean,
|};

export const SignupList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { games, signupTimes, leader } = props;

  const signupTime: string = useSelector(state => state.signup.signupTime);
  const username: string = useSelector(state => state.login.username);
  const groupCode: string = useSelector(state => state.login.groupCode);
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  );
  const signedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.myGames.signedGames
  );
  const selectedGames: $ReadOnlyArray<Signup> = useSelector(
    state => state.signup.selectedGames
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [submitting, setSubmitting] = React.useState(false);
  (submitting: boolean);

  const [signupSubmitted, setSignupSubmitted] = React.useState(false);
  (signupSubmitted: boolean);

  const [signupError, setSignupError] = React.useState('');
  (signupError: string);

  const prevSignedGames = usePrevious(signedGames);

  React.useEffect(() => {
    if (!prevSignedGames) return;
    if (prevSignedGames.length !== signedGames.length) {
      dispatch(submitSelectedGames(signedGames));
    }
  }, [dispatch, prevSignedGames, signedGames]);

  const onSubmitClick = async (): Promise<void> => {
    setSubmitting(true);

    const signupData = {
      username,
      selectedGames,
      signupTime,
    };

    let response = null;
    try {
      response = await dispatch(submitSignup(signupData));
    } catch (error) {
      console.log(`submitSignup error: `, error);
    }

    if (response && response.status === 'success') {
      showMessage('signupSubmitted');
    } else if (response && response.status === 'error') {
      if (response.code === 41) {
        showMessage('signupEnded');
      } else {
        showMessage('signupError');
      }
    }
    setSubmitting(false);
  };

  const onCancelClick = async (): Promise<void> => {
    setSubmitting(true);

    const gamesWithDifferentTime = selectedGames.filter(selectedGame => {
      if (selectedGame.time !== signupTime) {
        return selectedGame;
      }
    });

    const signupData = {
      username,
      selectedGames: gamesWithDifferentTime,
      signupTime: 'all',
    };

    let signupResponse = null;
    try {
      signupResponse = await dispatch(submitSignup(signupData));
    } catch (error) {
      console.log(`submitSignup error: `, error);
    }

    if (signupResponse && signupResponse.status === 'success') {
      showMessage('signupSubmitted');
      dispatch(submitSelectedGames(signupResponse.signedGames));
    } else if (signupResponse && signupResponse.status === 'error') {
      showMessage('signupError');
      setSignupError('signupError');
    }
    setSubmitting(false);
  };

  // Get games that have are not hidden, have signup open, and are not signed
  const filterAvailableGames = () => {
    const visibleGames = _.differenceBy(games, hiddenGames, 'gameId');

    const noSignupGames = config.noSignupGames;

    const signupOpenGames = visibleGames.filter(game => {
      if (noSignupGames.includes(game.gameId)) return false;
      else return true;
    });

    const selectedGameDetails = selectedGames.map(
      selectedGame => selectedGame.gameDetails
    );

    const availableGames = _.differenceBy(
      signupOpenGames,
      selectedGameDetails,
      'gameId'
    );

    const availableGamesForStartTime = availableGames.filter(
      nonSelectedGame => nonSelectedGame.startTime === signupTime
    );

    return _.sortBy(availableGamesForStartTime, [
      game => game.title.toLowerCase(),
    ]);
  };

  const filterSelectedGames = () => {
    const selectedGameDetails = selectedGames.map(
      selectedGame => selectedGame.gameDetails
    );

    return selectedGameDetails.filter(
      selectedGame => selectedGame.startTime === signupTime
    );
  };

  const updateSelectedGames = newSelectedGames => {
    if (newSelectedGames.length === 0) {
      dispatch(submitSelectedGames(newSelectedGames));
    }

    const newSignups = newSelectedGames.map(newSelectedGame => {
      return {
        gameDetails: { ...newSelectedGame },
        priority: newSelectedGames.indexOf(newSelectedGame) + 1,
        time: signupTime,
      };
    });

    const existingGames = selectedGames.filter(
      selectedGame => selectedGame.gameDetails.startTime !== signupTime
    );
    const combined = existingGames.concat(newSignups);
    dispatch(submitSelectedGames(combined));
  };

  /*
  const updateAvailableGames = newAvailableGames => {
    const existingGames = games.filter(game => game.startTime !== signupTime);
    const combined = existingGames.concat(newAvailableGames);
    dispatch(submitGetGamesAsync(combined));
  };
  */

  // Select signup time from buttons and store it
  const selectSignupTime = signupTime => {
    dispatch(submitSignupTime(signupTime));
  };

  const showMessage = async (message): Promise<void> => {
    if (message === 'signupSubmitted') {
      setSignupSubmitted(true);
    } else if (message === 'signupError') {
      setSignupError('signupError');
    } else if (message === 'signupEnded') {
      setSignupError('signupEnded');
    }
    await sleep(config.MESSAGE_DELAY);
    setSignupSubmitted(false);
    setSignupError('');
  };

  const signupStartTime = timeFormatter.startTime(signupTime);
  const signupEndTime = timeFormatter.endTime(signupTime);

  const isActive = isActive => (isActive ? 'active' : '');

  const checkForSignupChanges = (
    signedGames: $ReadOnlyArray<Signup>,
    selectedGames: $ReadOnlyArray<Signup>
  ): boolean => {
    const filteredSignedGames = signedGames.filter(signedGame => {
      return selectedGames.find(selectedGame => {
        return (
          signedGame.gameDetails.gameId === selectedGame.gameDetails.gameId
        );
      });
    });

    const filteredSelectedGames = selectedGames.filter(selectedGame => {
      return signedGames.find(signedGame => {
        return (
          selectedGame.gameDetails.gameId === signedGame.gameDetails.gameId
        );
      });
    });

    if (
      filteredSignedGames.length !== signedGames.length ||
      filteredSelectedGames.length !== selectedGames.length
    )
      return true;
    else return false;
  };

  const signupTimeButtons = signupTimes.map(time => {
    return (
      <button
        key={time}
        onClick={() => selectSignupTime(time)}
        className={`button-${time} ${isActive(time === signupTime)}`}
        disabled={time === signupTime}
      >
        {timeFormatter.weekdayAndTime({ time: time, capitalize: true })}
      </button>
    );
  });

  return (
    <div className='signup-list'>
      {signupTimes.length === 0 && <h2>{t('noOpenSignups')}</h2>}

      {signupTimes.length !== 0 && (
        <Fragment>
          <h2>{t('signupOpen')}</h2>
          <div className='signup-time-buttons-row'>{signupTimeButtons}</div>
        </Fragment>
      )}

      {signupTimes.length !== 0 && signupTime && (
        <Fragment>
          <div className='signup-info'>
            <p>
              {t('signupOpenBetweenCapital')} {signupStartTime}-{signupEndTime}.{' '}
              {t('signupResultHint')} {signupEndTime}
            </p>
            <p>{t('signupGuide')}</p>
          </div>

          <div className='signup-action-buttons-row'>
            <button disabled={submitting || !leader} onClick={onSubmitClick}>
              {t('button.signup')}
            </button>

            <button disabled={submitting || !leader} onClick={onCancelClick}>
              {t('button.cancelSignup')}
            </button>

            {signupSubmitted && (
              <span className='success bold'>{t('signupSaved')}</span>
            )}

            {signupError && <span className='error'>{t(signupError)} </span>}

            {checkForSignupChanges(signedGames, selectedGames) && (
              <span className='informative'>{t('signupUnsavedChanges')}</span>
            )}

            {!leader && <p className='bold'>{t('signupDisabledNotLeader')}</p>}
            {leader && groupCode !== '0' && (
              <p className='bold'>{t('signupForWholeGroup')}</p>
            )}
          </div>

          <DragAndDropList
            availableGames={filterAvailableGames()}
            selectedGames={filterSelectedGames()}
            updateSelectedGames={updateSelectedGames}
            // updateAvailableGames={updateAvailableGames}
          />
        </Fragment>
      )}
    </div>
  );
};

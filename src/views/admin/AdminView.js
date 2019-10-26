// @flow
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Hidden } from 'views/admin/components/Hidden';
import {
  submitSignupTime,
  submitToggleAppOpen,
} from 'views/admin/adminActions';
import { submitPlayersAssign } from 'views/results/resultsActions';
import { submitGamesUpdate } from 'views/all-games/allGamesActions';
import { TimesDropdown } from 'components/TimesDropdown';
import { timeFormatter } from 'utils/timeFormatter';
import type { Game } from 'flow/game.flow';
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const AdminView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const games: $ReadOnlyArray<Game> = useSelector(
    state => state.allGames.games
  );
  const signupTime: string = useSelector(state => state.admin.signupTime);
  const appOpen: boolean = useSelector(state => state.admin.appOpen);
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [submitting, setSubmitting] = React.useState(false);
  (submitting: boolean);

  const [message, setMessage] = React.useState('');
  (message: string);

  const [messageStyle, setMessageStyle] = React.useState('');
  (messageStyle: string);

  const [selectedSignupTime, setSelectedSignupTime] = React.useState(
    signupTime
  );
  (selectedSignupTime: string);

  const showMessage = async ({ message, style }) => {
    setMessage(message);
    setMessageStyle(style);
  };

  const getVisibleGames = () => {
    if (!hiddenGames) return games;
    const visibleGames = [];
    for (let i = 0; i < games.length; i += 1) {
      let match = false;

      for (let j = 0; j < hiddenGames.length; j += 1) {
        if (games[i].gameId === hiddenGames[j].gameId) {
          match = true;
          break;
        }
      }
      if (!match) {
        visibleGames.push(games[i]);
      }
    }
    return visibleGames;
  };

  const getStartingTimes = () => {
    const visibleGames = getVisibleGames();
    const startTimes = visibleGames.map(game => game.startTime);
    return [...Array.from(new Set(startTimes))].sort();
  };

  const submitUpdate = async (): Promise<any> => {
    setSubmitting(true);
    try {
      await dispatch(submitGamesUpdate());
    } catch (error) {
      console.log(`submitGamesUpdate error:`, error);
    }
    setSubmitting(false);
  };

  const submitAssign = async (): Promise<any> => {
    setSubmitting(true);

    showMessage({
      message: '',
      style: 'success',
    });

    let response = null;
    try {
      response = await dispatch(submitPlayersAssign(signupTime));
    } catch (error) {
      console.log(`submitPlayersAssign error:`, error);
    }
    setSubmitting(false);

    if (response && response.status === 'success') {
      showMessage({
        message: response.resultMessage,
        style: response.status,
      });
    } else if (response && response.status === 'error') {
      showMessage({
        message: response.message,
        style: response.status,
      });
    }
  };

  const submitTime = async (): Promise<any> => {
    setSubmitting(true);
    try {
      await dispatch(submitSignupTime(selectedSignupTime));
    } catch (error) {
      console.log(`submitSignupTime error:`, error);
    }
    setSubmitting(false);
  };

  const toggleAppOpen = async (): Promise<any> => {
    setSubmitting(true);
    try {
      await dispatch(submitToggleAppOpen(!appOpen));
    } catch (error) {
      console.log(`submitToggleAppOpen error:`, error);
    }
    setSubmitting(false);
  };

  return (
    <div className='admin-view'>
      <Fragment>
        <div className='admin-button-row'>
          <button
            disabled={submitting}
            onClick={() => {
              submitUpdate();
            }}
          >
            {t('button.updateDb')}
          </button>

          <button
            disabled={submitting}
            onClick={() => {
              submitAssign();
            }}
          >
            {t('button.assignPlayers')}
          </button>

          <button
            disabled={submitting}
            onClick={() => {
              toggleAppOpen();
            }}
          >
            {appOpen ? t('button.closeApp') : t('button.openApp')}
          </button>
        </div>

        {submitting && <p>{t('loading')}</p>}

        {(!games || games.length === 0) && <p>{t('noGamesInDatabase')}</p>}

        {games && games.length !== 0 && (
          <Fragment>
            <p className={messageStyle}>{message}</p>

            <p>{t('activeTimeDescription')}</p>

            <div className={'signup-open'}>
              {signupTime && (
                <p>
                  {t('activeTime')}:{' '}
                  {timeFormatter.weekdayAndTime({
                    time: signupTime,
                    capitalize: true,
                  })}
                </p>
              )}
              {!signupTime && <p>{t('noActiveTime')}</p>}
            </div>

            <button
              disabled={submitting}
              onClick={() => {
                submitTime();
              }}
            >
              {t('button.saveTime')}
            </button>

            <TimesDropdown
              times={getStartingTimes()}
              selectedTime={selectedSignupTime}
              onChange={event => setSelectedSignupTime(event.target.value)}
            />

            <Hidden hiddenGames={hiddenGames} />
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

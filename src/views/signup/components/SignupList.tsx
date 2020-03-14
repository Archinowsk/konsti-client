import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';
import { timeFormatter } from 'utils/timeFormatter';
import {
  submitSignup,
  submitSelectedGames,
  submitSignupTime,
  updateUnsavedChangesStatus,
} from 'views/signup/signupActions';
import { DragAndDropList } from 'views/signup/components/DragAndDropList';
import { sleep } from 'utils/sleep';
import { config } from 'config';
import { Accordion } from 'components/Accordion';
import { Game } from 'typings/game.typings';
import { Signup } from 'typings/user.typings';
import { RootState } from 'typings/redux.typings';

export interface Props {
  games: readonly Game[];
  signupTimes: readonly string[];
  leader: boolean;
}

export const SignupList: FC<Props> = (props: Props): ReactElement => {
  const { games, signupTimes, leader } = props;

  const signupTime: string = useSelector(
    (state: RootState) => state.signup.signupTime
  );
  const username: string = useSelector(
    (state: RootState) => state.login.username
  );
  const groupCode: string = useSelector(
    (state: RootState) => state.login.groupCode
  );
  const hiddenGames: readonly Game[] = useSelector(
    (state: RootState) => state.admin.hiddenGames
  );
  const signedGames: readonly Signup[] = useSelector(
    (state: RootState) => state.myGames.signedGames
  );
  const selectedGames: readonly Signup[] = useSelector(
    (state: RootState) => state.signup.selectedGames
  );
  const unsavedChanges: boolean = useSelector(
    (state: RootState) => state.signup.unsavedChanges
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [signupSubmitted, setSignupSubmitted] = React.useState<boolean>(false);
  const [signupError, setSignupError] = React.useState<string>('');

  React.useEffect(() => {
    if (!unsavedChanges) {
      dispatch(submitSelectedGames(signedGames));
    }
  }, [unsavedChanges, dispatch, signedGames]);

  const onSubmitClick = async (): Promise<void> => {
    setSubmitting(true);

    const signupData = {
      username,
      selectedGames,
      signupTime,
    };

    let response;
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
      signupTime: signupTime,
    };

    let signupResponse;
    try {
      signupResponse = await dispatch(submitSignup(signupData));
    } catch (error) {
      console.log(`submitSignup error: `, error);
    }

    if (signupResponse && signupResponse.status === 'success') {
      showMessage('signupSubmitted');
      dispatch(submitSelectedGames(signupResponse.signedGames));
    } else if (signupResponse && signupResponse.status === 'error') {
      if (signupResponse.code === 41) {
        showMessage('signupEnded');
      } else {
        showMessage('signupError');
      }
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
        priority: parseInt(newSelectedGames.indexOf(newSelectedGame), 10) + 1,
        time: signupTime,
      };
    });

    const existingGames = selectedGames.filter(
      selectedGame => selectedGame.gameDetails.startTime !== signupTime
    );
    const combined = existingGames.concat(newSignups);
    dispatch(submitSelectedGames(combined));
  };

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
    signedGames: readonly Signup[],
    selectedGames: readonly Signup[]
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
    ) {
      dispatch(updateUnsavedChangesStatus(true));
      return true;
    } else {
      dispatch(updateUnsavedChangesStatus(false));
      return false;
    }
  };

  const signupTimeButtons = signupTimes.map(time => {
    return (
      <StyledButton
        key={time}
        onClick={() => selectSignupTime(time)}
        className={`button-${time} ${isActive(time === signupTime)}`}
        disabled={time === signupTime}
      >
        {timeFormatter.weekdayAndTime({ time: time, capitalize: true })}
      </StyledButton>
    );
  });

  return (
    <SignupListContainer>
      {signupTimes.length === 0 && <h2>{t('noOpenSignups')}</h2>}

      {signupTimes.length !== 0 && (
        <>
          <h2>{t('signupOpen')}</h2>
          <div className='signup-time-buttons-row'>{signupTimeButtons}</div>
        </>
      )}

      {signupTimes.length !== 0 && signupTime && (
        <>
          <SignupInfo>
            <p>
              {t('signupOpenBetweenCapital')} {signupStartTime}-{signupEndTime}.{' '}
              {t('signupResultHint')} {signupEndTime}.
            </p>
            <Accordion
              text='signupGuide'
              title='signupGuideTitle'
              buttonText='signupGuideButton'
            />
          </SignupInfo>

          <div className='signup-action-buttons-row'>
            <button disabled={submitting || !leader} onClick={onSubmitClick}>
              {t('button.signup')}
            </button>

            <button disabled={submitting || !leader} onClick={onCancelClick}>
              {t('button.cancelSignup')}
            </button>

            {signupSubmitted && (
              <SuccessMessage>{t('signupSaved')}</SuccessMessage>
            )}

            {checkForSignupChanges(signedGames, selectedGames) && (
              <InfoMessage>{t('signupUnsavedChanges')}</InfoMessage>
            )}

            {!leader && <p className='bold'>{t('signupDisabledNotLeader')}</p>}
            {leader && groupCode !== '0' && (
              <p className='bold'>{t('signupForWholeGroup')}</p>
            )}

            <p>
              {signupError && <ErrorMessage>{t(signupError)} </ErrorMessage>}
            </p>
          </div>

          <DragAndDropList
            availableGames={filterAvailableGames()}
            selectedGames={filterSelectedGames()}
            updateSelectedGames={updateSelectedGames}
            // updateAvailableGames={updateAvailableGames}
          />
        </>
      )}
    </SignupListContainer>
  );
};

const StyledButton = styled.button`
  &.active {
    background-color: ${props => props.theme.buttonSelected};
    border: 1px solid ${props => props.theme.borderActive};
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.error};
`;

const InfoMessage = styled.span`
  color: ${props => props.theme.informative};
  font-weight: 600;
`;

const SuccessMessage = styled.span`
  color: ${props => props.theme.success};
  font-weight: 600;
`;

const SignupListContainer = styled.div`
  margin: 0;
`;

const SignupInfo = styled.div`
  margin: 0 0 20px 0;
`;

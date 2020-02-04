import React, { FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { getStartTimes } from 'utils/getStartTimes';
import { SignupsByStartTimes } from './SignupsByStartTimes';
import { config } from 'config';
import { Signup } from 'typings/user.typings';

import { RootState } from 'typings/redux.typings';

export interface Props {
  enteredGames: readonly Signup[];
  signedGames: readonly Signup[];
}

export const MyEnteredList: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { enteredGames, signedGames } = props;
  const { t } = useTranslation();
  const testTime: string = useSelector(
    (state: RootState) => state.admin.testTime
  );

  let timeNow: string = moment().format();
  if (config.loadedSettings !== 'production') {
    timeNow = testTime;
  }

  const signedGamesStartTimes = getStartTimes(
    signedGames.map(signedGame => signedGame.gameDetails)
  );

  // Get signup times for past signed games
  const pastSignupTimes = signedGamesStartTimes.filter(signedGamesStartTime => {
    const signupEndTime = moment(signedGamesStartTime).subtract(
      config.SIGNUP_END_TIME,
      'minutes'
    );

    if (signupEndTime.isBefore(moment(timeNow))) {
      return signedGamesStartTime;
    }
  });

  // Check if there are past signed games without entered game => missed signup
  const missedSignupTimes = pastSignupTimes.filter(pastSignupTime => {
    let found = false;
    if (enteredGames.length === 0) {
      return pastSignupTime;
    }

    enteredGames.find(enteredGame => {
      if (enteredGame.time === pastSignupTime) {
        found = true;
      }
    });

    if (!found) {
      return pastSignupTime;
    }
  });

  const missedSignups = missedSignupTimes.map(missedSignupTime => {
    return { gameDetails: null, time: missedSignupTime, priority: 0 };
  });

  // @ts-ignore
  const enteredGamesAndMissed = enteredGames.concat(missedSignups);

  const sortedEnteredGames = _.sortBy(enteredGamesAndMissed, [
    enteredGame => enteredGame.time,
  ]);

  const startTimes = sortedEnteredGames.map(sortedEnteredGame => {
    return sortedEnteredGame.time;
  });

  const uniqueStartTimes = [...Array.from(new Set(startTimes))];
  const sortedStartTimes = uniqueStartTimes.sort();

  return (
    <div className='my-entered-list'>
      <h3>{t('enteredGames')}</h3>
      <div className='my-signups-games'>
        {sortedEnteredGames.length === 0 && <span>{t('noEnteredGames')}</span>}
        {sortedEnteredGames.length !== 0 && (
          <SignupsByStartTimes
            signups={sortedEnteredGames}
            // @ts-ignore
            startTimes={sortedStartTimes}
          />
        )}
      </div>
    </div>
  );
};
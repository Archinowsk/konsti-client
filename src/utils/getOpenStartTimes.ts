import moment from 'moment';
import { config } from 'config';
import { getStartTimes } from './getStartTimes';
import { Game } from 'typings/game.typings';
import { getTime } from 'utils/getTime';

export const getPreSignupTimes = (games: readonly Game[]) => {
  const { PRE_SIGNUP_OPEN_TIME, PRE_SIGNUP_END_TIME } = config;

  const startTimes = getStartTimes(games);
  const timeNow = getTime();

  return startTimes.filter((startTime) => {
    const earliestSignupTime = moment(startTime)
      .subtract(PRE_SIGNUP_OPEN_TIME, 'hours')
      .subtract(1, 'minutes');

    const lastSignupTime = moment(startTime).subtract(
      PRE_SIGNUP_END_TIME,
      'hours'
    );

    if (moment(timeNow).isBetween(earliestSignupTime, lastSignupTime)) {
      return startTime;
    }
  });
};

export const getDirectSignupTimes = (games: readonly Game[]) => {
  const { DIRECT_SIGNUP_OPEN_TIME, DIRECT_SIGNUP_END_TIME } = config;

  const startTimes = getStartTimes(games);
  const timeNow = getTime();

  return startTimes.filter((startTime) => {
    const earliestSignupTime = moment(startTime)
      .subtract(DIRECT_SIGNUP_OPEN_TIME, 'hours')
      .subtract(1, 'minutes');

    const lastSignupTime = moment(startTime).subtract(
      DIRECT_SIGNUP_END_TIME,
      'hours'
    );

    if (moment(timeNow).isBetween(earliestSignupTime, lastSignupTime)) {
      return startTime;
    }
  });
};

import React, { FunctionComponent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { timeFormatter } from 'utils/timeFormatter';
import { Signup, EmptySignup } from 'typings/user.typings';

export interface Props {
  signups: ReadonlyArray<Signup | EmptySignup>;
  startTimes: readonly string[];
}

export const SignupsByStartTimes: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { signups, startTimes } = props;
  const { t } = useTranslation();

  const getGamesList = (startTime: string) => {
    return signups.map(signup => {
      if (signup.time === startTime) {
        if (!signup.gameDetails) {
          return (
            <p key={signup.time} className='game-details-list'>
              {t('noSignupResult')}
            </p>
          );
        } else {
          return (
            <p key={signup.gameDetails.gameId} className='game-details-list'>
              <Link to={`/games/${signup.gameDetails.gameId}`}>
                {signup.gameDetails.title}
              </Link>
            </p>
          );
        }
      }
    });
  };

  const startTimesList = startTimes.map(startTime => {
    return (
      <div key={startTime}>
        <p className='bold'>
          {timeFormatter.weekdayAndTime({ time: startTime, capitalize: true })}
        </p>
        {getGamesList(startTime)}
      </div>
    );
  });

  return <div className='start-times-list'>{startTimesList}</div>;
};

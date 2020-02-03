import React, { FunctionComponent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { timeFormatter } from 'utils/timeFormatter';
import { Game } from 'typings/game.typings';

export interface Props {
  games: readonly Game[];
  startTimes: readonly string[];
}

export const GamesByStartTimes: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { games, startTimes } = props;

  const getGamesList = (startTime: string) => {
    return games.map(game => {
      if (game.startTime === startTime) {
        return (
          <p key={game.gameId} className='game-details-list'>
            <Link to={`/games/${game.gameId}`}>{game.title} </Link>
          </p>
        );
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

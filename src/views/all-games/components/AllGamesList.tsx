import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { timeFormatter } from 'utils/timeFormatter';
import { Game } from 'typings/game.typings';

export interface Props {
  games: readonly Game[];
}

export const AllGamesList: FC<Props> = (props: Props): ReactElement => {
  const { games } = props;
  const { t } = useTranslation();

  const buildGamesList = games => {
    const sortedGames = _.sortBy(games, [
      game => game.startTime,
      game => game.title.toLowerCase(),
    ]);

    const groupedGames = _.groupBy(sortedGames, 'startTime');

    const GamesList = [];

    for (const [startTime, games] of Object.entries(groupedGames)) {
      const formattedStartTime = timeFormatter.weekdayAndTime({
        time: startTime,
        capitalize: true,
      });
      const signupStartTime = timeFormatter.startTime(startTime);
      const signupEndTime = timeFormatter.endTime(startTime);

      // @ts-ignore
      const allGamesRevolvingDoor = games.every(game => game.revolvingDoor);

      const title = (
        <h3 key={startTime} className='game-list-title'>
          <span className='game-startup-time'>{formattedStartTime}</span>
          {!allGamesRevolvingDoor && (
            <span className='game-signup-time'>
              {' '}
              ({t('signupOpenBetween')} {signupStartTime}-{signupEndTime})
            </span>
          )}
        </h3>
      );

      // @ts-ignore
      GamesList.push(title);

      // @ts-ignore
      for (const game of games) {
        const gameEntry = (
          <div key={game.gameId} className='games-list'>
            <Link to={`/games/${game.gameId}`}>{game.title}</Link>{' '}
            <p className='game-list-short-description'>
              {t(`programType.${game.programType}`)}:{' '}
              {game.shortDescription ? game.shortDescription : game.gameSystem}
            </p>
          </div>
        );

        // @ts-ignore
        GamesList.push(gameEntry);
      }
    }

    return GamesList;
  };

  const GamesList = buildGamesList(games);

  return (
    <div className='games-list'>
      {games.length === 0 && <h3>{t('noProgramItemsAvailable')}</h3>}
      {games.length !== 0 && <>{GamesList}</>}
    </div>
  );
};

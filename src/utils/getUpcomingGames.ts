import moment from 'moment';
import { config } from 'config';
import { Game } from 'typings/game.typings';
import { Signup } from 'typings/user.typings';

export const getUpcomingGames = (
  games: readonly Game[],
  testTime: string
): readonly Game[] => {
  const { useTestTime } = config;
  const timeNow = useTestTime ? moment(testTime) : moment();

  const upcomingGames = games.filter((game) =>
    moment(game.startTime).isAfter(timeNow)
  );

  return upcomingGames;
};

export const getUpcomingSignedGames = (
  signedGames: readonly Signup[],
  testTime: string
): readonly Signup[] => {
  const { useTestTime } = config;
  const timeNow = useTestTime ? moment(testTime) : moment();

  const upcomingGames = signedGames.filter((signedGame) => {
    return moment(signedGame.gameDetails.startTime)
      .add(1, 'hours')
      .isAfter(timeNow);
  });

  return upcomingGames;
};

export const getUpcomingEnteredGames = (
  enteredGames: readonly Signup[],
  testTime: string
): readonly Signup[] => {
  const { useTestTime } = config;
  const timeNow = useTestTime ? moment(testTime) : moment();

  const upcomingGames = enteredGames.filter((enteredGame) =>
    moment(enteredGame.gameDetails.startTime).add(1, 'hours').isAfter(timeNow)
  );

  return upcomingGames;
};

export const getUpcomingFavorites = (
  favoritedGames: readonly Game[],
  testTime: string
): readonly Game[] => {
  const { useTestTime } = config;
  const timeNow = useTestTime ? moment(testTime) : moment();

  const upcomingGames = favoritedGames.filter((favoritedGame) =>
    moment(favoritedGame.startTime).add(1, 'hours').isAfter(timeNow)
  );

  return upcomingGames;
};

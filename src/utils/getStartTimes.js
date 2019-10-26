// @flow
import type { Game } from 'flow/game.flow';

export const getStartTimes = (
  games: $ReadOnlyArray<Game>
): $ReadOnlyArray<string> => {
  const startTimes = games.map(game => {
    return game.startTime;
  });

  const uniqueTimes = [...Array.from(new Set(startTimes))];
  const sortedTimes = uniqueTimes.sort();

  return sortedTimes;
};

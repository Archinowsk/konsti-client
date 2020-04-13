import { Signup } from 'typings/user.typings';

export const filterSelectedGames = (
  selectedGames: readonly Signup[],
  signupTime: string
) => {
  const selectedGameDetails = selectedGames.map(
    (selectedGame) => selectedGame.gameDetails
  );

  return selectedGameDetails.filter(
    (selectedGame) => selectedGame.startTime === signupTime
  );
};

import React, { FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { getStartTimes } from 'utils/getStartTimes';
import { GamesByStartTimes } from './GamesByStartTimes';
import { Game } from 'typings/game.typings';

export interface Props {
  favoritedGames: readonly Game[];
}

export const MyFavoritesList: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { favoritedGames } = props;
  const { t } = useTranslation();

  const sortedGames: readonly Game[] = _.sortBy(favoritedGames, [
    favoritedGame => favoritedGame.startTime,
    favoritedGame => favoritedGame.title.toLowerCase(),
  ]);

  const startTimes = getStartTimes(favoritedGames);

  return (
    <div className='my-favorites-list'>
      <h3>{t('favoritedGames')}</h3>
      <div className='my-favorites-games'>
        {favoritedGames.length === 0 && <span>{t('noFavoritedGames')}</span>}
        {favoritedGames.length !== 0 && (
          <GamesByStartTimes games={sortedGames} startTimes={startTimes} />
        )}
      </div>
    </div>
  );
};

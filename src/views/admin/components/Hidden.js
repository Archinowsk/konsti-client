// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { timeFormatter } from 'utils/timeFormatter';
import type { Game } from 'flow/game.flow';
import type { StatelessFunctionalComponent, Element } from 'react';

export type Props = {|
  hiddenGames: $ReadOnlyArray<Game>,
|};

export const Hidden: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { hiddenGames } = props;
  const { t } = useTranslation();

  const sortedGames = _.sortBy(hiddenGames, [
    hiddenGame => hiddenGame.title.toLowerCase(),
  ]);

  const GamesList = sortedGames.map(game => (
    <li key={game.gameId}>
      <Link to={`/games/${game.gameId}`}>{game.title}</Link>
      {' - '}
      {timeFormatter.weekdayAndTime({
        time: game.startTime,
        capitalize: false,
      })}
    </li>
  ));

  return (
    <div className='hidden'>
      <h3>{t('hiddenGames')}</h3>
      <ul>
        {!hiddenGames && <span>{t('noHiddenGames')}</span>}
        {GamesList}
      </ul>
    </div>
  );
};

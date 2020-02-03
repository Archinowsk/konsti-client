import React, { FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { timeFormatter } from 'utils/timeFormatter';
import { Result } from 'typings/result.typings';
import { RootState } from 'typings/redux.typings';

export const ResultsList: FunctionComponent<{}> = (): ReactElement<'div'> => {
  const results: readonly Result[] = useSelector(
    (state: RootState) => state.results.result
  );
  const startTime: string = useSelector(
    (state: RootState) => state.results.startTime
  );
  const { t } = useTranslation();

  const validResults = results.filter(result => result.enteredGame.gameDetails);

  const sortedResults = _.sortBy(validResults, [
    result => result.enteredGame.gameDetails.title.toLowerCase(),
  ]);

  const groupedResults = _.groupBy(
    sortedResults,
    'enteredGame.gameDetails.title'
  );

  const resultsByGameTitle: any = [];

  for (const result in groupedResults) {
    const sortedResults = _.sortBy(groupedResults[result], [
      result => result.username.toLowerCase(),
    ]);

    const playerList = sortedResults.map(result => (
      <p key={result.username}>{result.username}</p>
    ));

    resultsByGameTitle.push(
      <div className='game-result' key={result}>
        <p>
          <span className='bold'>{t('gameTitle')}:</span> {result}
        </p>
        <p>
          <span className='bold'>{t('gameInfo.location')}:</span>{' '}
          {_.head(groupedResults[result]).enteredGame.gameDetails.location}
        </p>
        <p>
          <span className='bold'>{t('players')}: </span>
          {playerList.length}/
          {_.head(groupedResults[result]).enteredGame.gameDetails.maxAttendance}
        </p>
      </div>
    );
  }

  return (
    <div className='results-with-free-seats'>
      <h3>
        {t('signupResults')}:{' '}
        {startTime ? (
          <span>
            {timeFormatter.weekdayAndTime({
              time: startTime,
              capitalize: false,
            })}
          </span>
        ) : (
          <span>{t('noResults')}</span>
        )}
      </h3>
      {resultsByGameTitle}
    </div>
  );
};

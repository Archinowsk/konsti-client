// @flow
import React, { Fragment } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ResultsList } from 'views/results/components/ResultsList';
import { timeFormatter } from 'utils/timeFormatter';
import { loadResults, loadSettings } from 'utils/loadData';
import type { Result } from 'flow/result.flow';
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const ResultsView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const result: $ReadOnlyArray<Result> = useSelector(
    state => state.results.result
  );
  const signupTime: string = useSelector(state => state.admin.signupTime);
  const { t } = useTranslation();

  const store = useStore();

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await loadSettings(store);
      await loadResults(store);
    };
    fetchData();
  }, [store]);

  const validResults = result.filter(result => result.enteredGame.gameDetails);

  return (
    <div className='results-view'>
      {!signupTime && <h2>{t('noResults')}</h2>}
      {signupTime && (
        <Fragment>
          <h2>
            {t('signupResultsfor')}{' '}
            {timeFormatter.weekdayAndTime({
              time: signupTime,
              capitalize: false,
            })}
          </h2>
          <ResultsList results={validResults} />
        </Fragment>
      )}
    </div>
  );
};

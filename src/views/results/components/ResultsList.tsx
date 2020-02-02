import React, { FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ResultsByGameTitle } from './ResultsByGameTitle';
import { ResultsByUsername } from './ResultsByUsername';
import { Result } from 'typings/result.typings';

export interface Props {
  results: readonly Result[];
}

export const ResultsList: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { results } = props;
  const { t } = useTranslation();

  const [sortedBy, setSortedBy] = React.useState<string>('');

  React.useEffect(() => {
    setSortedBy('username');
  }, []);

  const buttons = ['username', 'gameTitle'];

  return (
    <div className='results-list'>
      <div className='results-button-row'>
        <span>{t('sortBy')} </span>

        {buttons.map(name => {
          return (
            <button
              disabled={sortedBy === name}
              value={name}
              onClick={() => setSortedBy(name)}
              key={name}
            >
              {t(name)}
            </button>
          );
        })}
      </div>
      {sortedBy === 'username' && <ResultsByUsername results={results} />}
      {sortedBy === 'gameTitle' && <ResultsByGameTitle results={results} />}
    </div>
  );
};

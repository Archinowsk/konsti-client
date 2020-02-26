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
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<any>([]);

  React.useEffect(() => {
    setSortedBy('username');
  }, []);

  React.useEffect(() => {
    setSearchResults(
      results.filter(result => {
        return (
          result.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.enteredGame.gameDetails.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [searchTerm]);

  const buttons = ['username', 'gameTitle'];

  const handleSearchFieldChange = e => {
    setSearchTerm(e.target.value);
  };

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
        <br />
        <span>{t('find')} </span>
        <input
          type='text'
          value={searchTerm}
          onChange={handleSearchFieldChange}
        />
      </div>
      {sortedBy === 'username' && (
        <ResultsByUsername
          results={
            Object.entries(searchResults).length === 0 ? results : searchResults
          }
        />
      )}
      {sortedBy === 'gameTitle' && (
        <ResultsByGameTitle
          results={
            Object.entries(searchResults).length === 0 ? results : searchResults
          }
        />
      )}
    </div>
  );
};

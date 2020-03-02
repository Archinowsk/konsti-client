import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import { ResultsList } from 'views/helper/components/ResultsList';
import { PasswordManagement } from 'views/helper/components/PasswordManagement';
import { loadResults, loadSettings } from 'utils/loadData';

export const HelperView: FC<{}> = (): ReactElement => {
  const { t } = useTranslation();

  const [selectedTool, setSelectedTool] = React.useState<string>('results');

  const store = useStore();

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await loadSettings(store);
      await loadResults(store);
    };
    fetchData();
  }, [store]);

  return (
    <div className='helper-view'>
      <button
        disabled={selectedTool === 'results'}
        onClick={() => setSelectedTool('results')}
      >
        {t('helperResults')}
      </button>
      <button
        disabled={selectedTool === 'password-management'}
        onClick={() => setSelectedTool('password-management')}
      >
        {t('helperPasswordManagement')}
      </button>

      <>
        {selectedTool === 'results' && <ResultsList />}
        {selectedTool === 'password-management' && <PasswordManagement />}
      </>
    </div>
  );
};

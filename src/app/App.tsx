import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { hot } from 'react-hot-loader/root';
import { useTranslation } from 'react-i18next';
import { useSelector, useStore } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'app/Routes';
import { Header } from 'components/Header';
import { loadData } from 'utils/loadData';
import { Loading } from 'components/Loading';
import { getIconLibrary } from 'utils/icons';
import { config } from 'config';

import { RootState } from 'typings/redux.typings';

export const App: FunctionComponent<{}> = (): ReactElement<typeof Fragment> => {
  const { dataUpdateInterval } = config;
  const appOpen: boolean = useSelector(
    (state: RootState) => state.admin.appOpen
  );
  const { t } = useTranslation();
  const store = useStore();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async (): Promise<void> => {
      await loadData(store);
      setLoading(false);
    };
    fetchData();

    const startUpdateTimer = () => {
      setInterval(() => fetchData(), dataUpdateInterval * 1000);
    };
    startUpdateTimer();
  }, [store, dataUpdateInterval]);

  getIconLibrary();

  return (
    <Fragment>
      <Header />
      {/* <h3>{t('errorMessage')}</h3> */}

      {loading && <Loading />}

      {!loading && (
        <Fragment>
          {!appOpen && <h2>{t('closingMessage')}</h2>}
          <BrowserRouter>
            <Routes onlyAdminLoginAllowed={!appOpen} />
          </BrowserRouter>
        </Fragment>
      )}
    </Fragment>
  );
};

export default hot(App);

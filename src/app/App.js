// @flow
import React, { Fragment } from 'react';
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
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const App: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const { dataUpdateInterval } = config;
  const appOpen: boolean = useSelector(state => state.admin.appOpen);
  const { t } = useTranslation();
  const store = useStore();

  const [loading, setLoading] = React.useState(true);
  (loading: boolean);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async (): Promise<any> => {
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

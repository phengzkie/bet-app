import React, { useEffect, Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';

import Alerts from '../../../layout/Alerts';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';
// sidebar nav config
import navigation from '../../../_nav2';
// routes config
import routes from '../../../routes';

// States
import CoordinatorAuthContext from '../../../context/coordinatorAuth/coordinatorAuthContext';
import CollectorState from '../../../context/collector/CollectorState';
import BetContext from '../../../context/bet/betContext';

const CoordinatorFooter = React.lazy(() => import('./CoordinatorFooter'));
const CoordinatorHeader = React.lazy(() => import('./CoordinatorHeader'));

const CoordinatorLayout = props => {
  const coordinatorAuthContext = useContext(CoordinatorAuthContext);
  const betContext = useContext(BetContext);

  const {
    loadCoordinator,
    isCoordinator,
    logout,
    loading,
    coordinator
  } = coordinatorAuthContext;

  const { onLogout } = betContext;

  useEffect(() => {
    loadCoordinator();

    // eslint-disable-next-line
  }, []);

  const load = () => (
    <div className="animated fadeIn pt-1 text-center">
      <Spinner color="primary" />
    </div>
  );

  const signOut = e => {
    e.preventDefault();
    logout();
    onLogout();

    props.history.push('/coordinator/login');
  };
  return (
    <div className="app">
      <CollectorState>
        <AppHeader fixed>
          <Suspense fallback={load()}>
            {coordinator !== null ? (
              <CoordinatorHeader
                coordinator={coordinator}
                onLogout={e => signOut(e)}
              />
            ) : null}
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <br></br>
            <Container fluid>
              <Suspense fallback={load()}>
                <Alerts />
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        owner={route.owner}
                        render={props =>
                          isCoordinator && !loading ? (
                            <route.component {...props} />
                          ) : (
                            <Redirect to={'/coordinator/login'} />
                          )
                        }
                      />
                    ) : null;
                  })}
                  <Redirect from="/coordinator" to="/coordinator/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed></AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={load()}>
            <CoordinatorFooter />
          </Suspense>
        </AppFooter>
      </CollectorState>
    </div>
  );
};

export default CoordinatorLayout;

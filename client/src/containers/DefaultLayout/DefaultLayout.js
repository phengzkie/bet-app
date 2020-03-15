import React, { Suspense, useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';

import Alerts from '../../layout/Alerts';

// Context
import AuthContext from '../../context/auth/authContext';

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

// States
import ProvinceState from '../../context/province/ProvinceState';
import TownState from '../../context/town/TownState';
import StationState from '../../context/station/StationState';
import BlockingState from '../../context/blocking/BlockingState';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, loading, user } = authContext;

  useEffect(() => {
    authContext.loadUser();

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
    props.history.push('/login');
  };

  return (
    <BlockingState>
      <ProvinceState>
        <TownState>
          <StationState>
            <div className="app">
              <AppHeader fixed>
                <Suspense fallback={load()}>
                  {user !== null ? (
                    <DefaultHeader user={user} onLogout={e => signOut(e)} />
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
                  <AppBreadcrumb router={router} />
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
                              render={props =>
                                isAuthenticated && !loading ? (
                                  <route.component {...props} />
                                ) : (
                                  <Redirect to={'/login'} />
                                )
                              }
                            />
                          ) : null;
                        })}
                        <Redirect from="/" to="/dashboard" />
                      </Switch>
                    </Suspense>
                  </Container>
                </main>
              </div>
              <AppFooter>
                <Suspense fallback={load()}>
                  <DefaultFooter />
                </Suspense>
              </AppFooter>
            </div>
          </StationState>
        </TownState>
      </ProvinceState>
    </BlockingState>
  );
};

export default DefaultLayout;

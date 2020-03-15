import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
// Context
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import CoordinatorAuthState from './context/coordinatorAuth/CoordinatorAuthState';
import BetState from './context/bet/BetState';
import setAuthToken from './utils/setAuthToken';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages

const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const CoordinatorLogin = React.lazy(() =>
  import('./views/Pages/CoordinatorLogin/CoordinatorLogin')
);
const CoordinatorDashboard = React.lazy(() =>
  import('./views/Pages/Coordinator/CoordinatorLayout')
);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  render() {
    return (
      <AuthState>
        <AlertState>
          <CoordinatorAuthState>
            <BetState>
              <Router>
                <React.Suspense fallback={loading()}>
                  <Switch>
                    <Route
                      exact
                      path="/login"
                      name="Login Page"
                      render={props => <Login {...props} />}
                    />
                    <Route
                      exact
                      path="/coordinator/login"
                      name="Coordinator Login Page"
                      render={props => <CoordinatorLogin {...props} />}
                    />
                    <Route
                      path="/coordinator"
                      name="Coordinator Dashboard"
                      render={props => <CoordinatorDashboard {...props} />}
                    />
                    <Route
                      exact
                      path="/404"
                      name="Page 404"
                      render={props => <Page404 {...props} />}
                    />
                    <Route
                      exact
                      path="/500"
                      name="Page 500"
                      render={props => <Page500 {...props} />}
                    />
                    <Route
                      path="/"
                      name="Home"
                      render={props => <DefaultLayout {...props} />}
                    />
                  </Switch>
                </React.Suspense>
              </Router>
            </BetState>
          </CoordinatorAuthState>
        </AlertState>
      </AuthState>
    );
  }
}

export default App;

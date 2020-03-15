import React from 'react';

const Batangas = React.lazy(() => import('./views/Area/Batangas/Batangas'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Admin = React.lazy(() => import('./views/Users/Admin/Users'));
const User = React.lazy(() => import('./views/Users/Admin/User'));
const Coordinator = React.lazy(() =>
  import('./views/Users/Coordinators/Coordinator')
);
const Result = React.lazy(() => import('./views/Results/Result'));
const Blocking = React.lazy(() => import('./views/Blocking/Blocking'));
const Payout = React.lazy(() => import('./views/Payout/Payout'));
const Coordinators = React.lazy(() =>
  import('./views/Users/Coordinators/Coordinators')
);
const Register = React.lazy(() => import('./views/Register/Register'));
const Locations = React.lazy(() => import('./views/Locations/Locations'));
const AddCoordinator = React.lazy(() =>
  import('./views/Coordinators/AddCoordinator')
);

// Coordinator
const CoordinatorDashboard = React.lazy(() =>
  import('./views/CoordinatorDashboard/Dashboard')
);
const CoordinatorResult = React.lazy(() =>
  import('./views/CoordinatorDashboard/Result')
);

// Collector
const AddCollector = React.lazy(() =>
  import('./views/CoordinatorDashboard/AddCollector')
);
const Collectors = React.lazy(() => import('./views/Collectors/Collector'));
const Bets = React.lazy(() => import('./views/CoordinatorDashboard/Bets'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/area/batangas', name: 'Batangas', component: Batangas },
  { path: '/users/admins', name: 'Admin', component: Admin },
  {
    path: '/users/coordinators',
    name: 'Coordinators',
    component: Coordinators
  },
  {
    path: '/users/:id',
    exact: true,
    name: 'User Details',
    component: User
  },
  {
    path: '/coordinators/:id',
    exact: true,
    name: 'Coordinator Details',
    component: Coordinator
  },
  {
    path: '/register',
    exact: true,
    name: 'Register',
    component: Register
  },
  {
    path: '/results',
    exact: true,
    name: 'Results',
    component: Result
  },
  {
    path: '/blocking',
    exact: true,
    name: 'Blocking',
    component: Blocking
  },
  {
    path: '/payout',
    exact: true,
    name: 'Payout',
    component: Payout
  },
  {
    path: '/locations',
    exact: true,
    name: 'Locations',
    component: Locations
  },
  {
    path: '/coordinators',
    exact: true,
    name: 'AddCoordinator',
    component: AddCoordinator
  },
  { path: '/coordinator', exact: true, name: 'Coordinator' },
  {
    path: '/coordinator/dashboard',
    exact: true,
    owner: 'Coordinator',
    name: 'Dashboard',
    component: CoordinatorDashboard
  },
  {
    path: '/coordinator/add_collector',
    exact: true,
    owner: 'Coordinator',
    name: 'Add Collector',
    component: AddCollector
  },
  {
    path: '/coordinator/collectors',
    exact: true,
    owner: 'Coordinator',
    name: 'Collectors',
    component: Collectors
  },
  {
    path: '/coordinator/bets',
    exact: true,
    name: 'Collectors',
    component: Bets
  },
  {
    path: '/coordinator/result',
    owner: 'Coordinator',
    exact: true,
    name: 'Result',
    component: CoordinatorResult
  }
];

export default routes;

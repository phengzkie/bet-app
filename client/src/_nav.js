export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Transactions',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Result',
      url: '/results',
      icon: 'icon-trophy'
    },
    {
      name: 'Blocking',
      url: '/blocking',
      icon: 'icon-shield'
    },
    {
      name: 'Payout',
      url: '/payout',
      icon: 'icon-wallet'
    },
    {
      title: true,
      name: 'Settings',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Add Locations',
      url: '/locations',
      icon: 'icon-location-pin'
    },
    {
      name: 'Registration',
      url: '/registration',
      icon: 'icon-people',
      children: [
        {
          name: 'Register Admin',
          url: '/register',
          icon: 'icon-people'
        },
        {
          name: 'Register Coordinator',
          url: '/coordinators',
          icon: 'icon-people'
        }
      ]
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-star',
      children: [
        // {
        //   name: 'Admin',
        //   url: '/users/admins',
        //   icon: 'icon-star'
        // },
        {
          name: 'Coordinators',
          url: '/users/coordinators',
          icon: 'icon-star'
        }
      ]
    }
  ]
};

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/coordinator/dashboard',
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
      name: 'Bets',
      url: '/coordinator/bets',
      icon: 'icon-game-controller'
    },
    {
      name: 'Result',
      url: '/coordinator/result',
      icon: 'icon-trophy'
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
      name: 'Register Collector',
      url: '/coordinator/add_collector',
      icon: 'icon-people'
    },
    {
      name: 'Collectors',
      url: '/coordinator/collectors',
      icon: 'icon-star'
    }
  ]
};

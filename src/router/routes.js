const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        title: 'Nopal',
        icon: 'home',
        path: '/nopal',
        component: () => import('pages/Nopal.vue')
      },
      {
        title: 'Points',
        icon: 'home',
        path: '/points',
        component: () => import('pages/Points.vue')
      },
      {
        title: 'Settings',
        icon: 'home',
        path: '/settings',
        component: () => import('pages/Settings.vue')
      },
      {
        title: 'Login',
        icon: 'home',
        path: '/auth',
        component: () => import('pages/Login.vue')
      },
      {
        title: 'Cashpower',
        icon: 'home',
        path: '/cashpower',
        component: () => import('pages/Cashpower.vue')
      }
    ]
  },

  // Always leave this as last one
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

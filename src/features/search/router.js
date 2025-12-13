const DiscoverView = () => import('./views/DiscoverView.vue')

export default [
  {
    path: '/discover',
    name: 'discover',
    component: DiscoverView,
    meta: {
      title: 'Discover Movies',
    },
  },
]

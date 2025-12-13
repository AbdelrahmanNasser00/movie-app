const favoritesView = () => import('./views/favoritesView.vue')

export default [
  {
    path: '/favorites',
    name: 'Favorites',
    component: favoritesView,
    meta: {
      title: 'Your Favorites',
    },
  },
]

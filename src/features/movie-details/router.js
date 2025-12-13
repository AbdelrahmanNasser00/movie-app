const MovieDetailsView = () => import('./views/MoviesDetailsView.vue')
export default [
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetailsView,
    meta: {
      title: 'Movie Details',
    },
  },
]

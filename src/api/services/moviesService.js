import httpClient from '@/api/api'

export const moviesService = {
  getTrendingMovies: (timeWindow = 'week', page = 1) => {
    return httpClient.get(`/trending/movie/${timeWindow}`, {
      params: { page },
    })
  },
  getDetails: (movieId) => {
    return httpClient.get(`/movie/${movieId}`)
  },
  getTopRated: (page = 1) => {
    return httpClient.get('/movie/top_rated', {
      params: { page },
    })
  },
  getPopular: (page = 1) => {
    return httpClient.get('/movie/popular', {
      params: { page },
    })
  },
  getGenres: () => {
    return httpClient.get('/genre/movie/list')
  },
  getDiscoverMovies(genreId = null, page = 1) {
    const params = { page }
    if (genreId) {
      params.with_genres = genreId
    }
    return httpClient.get('/discover/movie', { params })
  },
  searchMovies(query) {
    return httpClient.get('/search/movie', {
      params: { query },
    })
  },
  movieSimilar(movieId, page = 1) {
    return httpClient.get(`/movie/${movieId}/similar`, {
      params: { page },
    })
  },
}

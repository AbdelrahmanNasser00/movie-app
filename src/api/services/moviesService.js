import httpClient from '@/api/api'

export const trendingMoviesService = {
  getTrendingMovies: (timeWindow = 'week', page = 1) => {
    return httpClient.get(`/trending/movie/${timeWindow}`, {
      params: { page },
    })
  },
  getDetails: (movieId) => {
    return httpClient.get(`/movie/${movieId}`)
  },
}

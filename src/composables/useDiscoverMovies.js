import { moviesService } from '@/api/services/moviesService'
import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'

export const useDiscoverMovies = (genreId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['discover-movies', genreId],
    queryFn: () => {
      const id = unref(genreId)
      return moviesService.getDiscoverMovies(id).then((res) => res.data)
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })

  const movies = computed(() => data?.value?.results || [])

  return {
    movies,
    isLoading,
    error,
  }
}

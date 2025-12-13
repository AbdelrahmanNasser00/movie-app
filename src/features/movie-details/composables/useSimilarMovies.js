import { moviesService } from '@/api/services/moviesService'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export const useSimilarMovies = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['similar-movies', id],
    queryFn: () => moviesService.getSimilarMovies(id).then((res) => res.data),
  })

  const movies = computed(() => data?.value?.results || [])

  return {
    data,
    movies,
    isLoading,
    error,
  }
}

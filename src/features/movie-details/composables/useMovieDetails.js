import { moviesService } from '@/api/services/moviesService'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export const useMovieDetails = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['movie-details', id],
    queryFn: () => moviesService.getDetails(id.value).then((res) => res.data),
  })
  const movie = computed(() => data?.value || {})

  return {
    data,
    movie,
    isLoading,
    error,
  }
}

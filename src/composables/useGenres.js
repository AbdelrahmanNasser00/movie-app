import { moviesService } from '@/api/services/moviesService'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export const useGenres = () => {
  const { data } = useQuery({
    queryKey: ['movie-genres'],
    queryFn: () => moviesService.getGenres().then((res) => res.data),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })

  const genres = computed(() => data?.value?.genres || [])

  return {
    genres,
  }
}

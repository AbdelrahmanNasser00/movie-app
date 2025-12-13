import { moviesService } from '@/api/services/moviesService'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'

export const useTopRatedMovies = () => {
  const page = ref(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ['top-rated-movies', page],
    queryFn: () => moviesService.getTopRated(page.value).then((res) => res.data),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })

  const movies = computed(() => data?.value?.results || [])
  const totalPages = computed(() => data?.value?.total_pages || 1)
  const totalResults = computed(() => data?.value?.total_results || 0)

  return {
    data,
    movies,
    totalPages,
    totalResults,
    isLoading,
    error,
    page,
  }
}

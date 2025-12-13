import { moviesService } from '@/api/services/moviesService'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'

export const useSearch = () => {
  const query = ref('')
  const page = ref(1)

  const setSearchQuery = (newQuery) => {
    query.value = newQuery
    page.value = 1
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['search-movies', query, page],
    queryFn: () => moviesService.searchMovies(query.value).then((res) => res.data),
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
    setSearchQuery,
  }
}

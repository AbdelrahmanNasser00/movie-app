import { moviesService } from '@/api/services/moviesService'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'

export const useDiscoverMovies = (genreId) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['discover-movies', genreId],
      queryFn: ({ pageParam = 1 }) => {
        const id = unref(genreId)
        return moviesService.getDiscoverMovies(id, pageParam).then((res) => res.data)
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1
        }
        return undefined
      },
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
    })

  const movies = computed(() => {
    return data.value?.pages.flatMap((page) => page?.results) || []
  })

  return {
    movies,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}

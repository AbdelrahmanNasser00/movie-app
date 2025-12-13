<script setup>
import BrowseByGenreSection from '@/components/BrowseByGenreSection.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import HeroSection from '@/components/HeroSection.vue'
import HomeSection from '@/components/HomeSection.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SectionsWrapper from '@/components/SectionsWrapper.vue'
import { useDiscoverMovies } from '@/composables/useDiscoverMovies'
import { useGenres } from '@/composables/useGenres'
import { usePopularMovies } from '@/features/popular-movies/composables/usePopularMovies'
import { useTopRatedMovies } from '@/features/top-rated/composables/useTopRatedMovies'
import { useTrendingMovies } from '@/features/trending-movies/composables/useTrendingMovies'
import { ref } from 'vue'

const activeGenreId = ref(null)
const handleFilter = (id) => {
  activeGenreId.value = id
}

const {
  movies: trendingMovies,
  error: trendingError,
  isLoading: isTrendingLoading,
  refetch: refetchTrending,
} = useTrendingMovies('day')
const {
  movies: popularMovies,
  error: popularError,
  isLoading: isPopularLoading,
  refetch: refetchPopular,
} = usePopularMovies()
const {
  movies: topRatedMovies,
  error: topRatedError,
  isLoading: isTopRatedLoading,
  refetch: refetchTopRated,
} = useTopRatedMovies()

const { genres } = useGenres()
const {
  movies: discoverMovies,
  isLoading: isDiscoverLoading,
  error: discoverError,
} = useDiscoverMovies(activeGenreId)
console.log(discoverMovies.value)
</script>

<template>
  <HeroSection :movies="trendingMovies.slice(0, 5) ?? []" />
  <SectionsWrapper>
    <div>
      <LoadingSpinner v-if="isTrendingLoading" message="Loading trending movies..." />
      <ErrorMessage
        v-else-if="trendingError"
        title="Failed to load trending movies"
        :message="trendingError.message"
        @retry="refetchTrending"
      />
      <HomeSection
        v-else
        :movies="trendingMovies"
        header="Trending Movies"
        subheader="Discover the latest trending movies"
      />
    </div>
    <div>
      <LoadingSpinner v-if="isPopularLoading" message="Loading popular movies..." />
      <ErrorMessage
        v-else-if="popularError"
        title="Failed to load popular movies"
        :message="popularError.message"
        @retry="refetchPopular"
      />
      <HomeSection
        v-else
        :movies="popularMovies"
        header="Popular Movies"
        subheader="Discover the latest popular movies"
      />
    </div>
    <div>
      <LoadingSpinner v-if="isTopRatedLoading" message="Loading top rated movies..." />
      <ErrorMessage
        v-else-if="topRatedError"
        title="Failed to load top rated movies"
        :message="topRatedError.message"
        @retry="refetchTopRated"
      />
      <HomeSection
        v-else
        :movies="topRatedMovies"
        header="Top Rated Movies"
        subheader="Discover the latest top rated movies"
      />
    </div>
    <div>
      <LoadingSpinner v-if="isDiscoverLoading" message="Loading discover movies..." />
      <ErrorMessage
        v-else-if="discoverError"
        title="Failed to load discover movies"
        :message="discoverError.message"
        @retry="refetchDiscover"
      />
      <BrowseByGenreSection
        v-else
        :movies="discoverMovies"
        :genres="genres.slice(0, 5) ?? []"
        :activeGenreId="activeGenreId"
        @filter="handleFilter"
        header="Browse by Genre"
        subheader="Discover the latest top rated movies"
      />
    </div>
  </SectionsWrapper>
</template>

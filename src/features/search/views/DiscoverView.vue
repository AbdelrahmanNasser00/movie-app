<script setup>
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useDiscoverMovies } from '@/composables/useDiscoverMovies'
import { computed, onMounted, ref } from 'vue'
import { useSearch } from '../composables/useSearch'
import { useRoute, useRouter } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'
import { Search, X } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { watchDebounced } from '@vueuse/core'

const searchQuery = ref('')
const router = useRouter()
const route = useRoute()

const updateUrl = (searchQuery) => {
  router.replace({
    query: searchQuery ? { query: searchQuery } : {},
  })
}

onMounted(() => {
  if (route.query.query) {
    searchQuery.value = route.query.query
  }
})

const {
  movies: discoverMovies,
  isLoading: isDiscoverLoading,
  error: discoverError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useDiscoverMovies()

const {
  movies: searchMovies,
  isLoading: isSearchLoading,
  error: searchError,
  setSearchQuery,
} = useSearch()

watchDebounced(
  searchQuery,
  (newQuery) => {
    setSearchQuery(newQuery)
    updateUrl(newQuery)
  },
  { debounce: 500 },
)

const isSearchMode = computed(() => searchQuery.value.trim().length > 0)
const displayMovies = computed(() =>
  isSearchMode.value ? searchMovies.value || [] : discoverMovies.value || [],
)
const isLoading = computed(() =>
  isSearchMode.value ? isSearchLoading.value : isDiscoverLoading.value,
)
const error = computed(() => (isSearchMode.value ? searchError.value : discoverError.value))

const clearSearch = () => {
  searchQuery.value = ''
  router.push({ path: route.path, query: {} })
}
const handleRetry = () => {
  if (isSearchMode.value) {
    setSearchQuery(searchQuery.value)
  }
}

const handleLoadMore = () => {
  if (hasNextPage.value) {
    fetchNextPage()
  }
}
</script>

<template>
  <div class="min-h-screen py-12">
    <div class="from-card to-background py-12">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">Discover Movies</h1>
        <p class="text-muted-foreground mb-8">
          Explore thousands of movies or search for your favorites
        </p>

        <div class="relative max-w-2xl">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Search for movies..."
            class="pl-10 pr-10 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer hover:text-foreground transition-colors"
          >
            <X class="h-5 w-5" />
          </Button>
        </div>

        <div v-if="isSearchMode" class="mt-4">
          <p class="text-sm text-muted-foreground">
            Searching for: <span class="text-foreground font-medium">"{{ searchQuery }}"</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Movies Grid -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 mt-12">
      <LoadingSpinner
        v-if="isLoading"
        :message="isSearchMode ? 'Searching movies...' : 'Loading movies...'"
      />

      <ErrorMessage
        v-else-if="error"
        :title="isSearchMode ? 'Search failed' : 'Failed to load movies'"
        :message="error.message"
        @retry="handleRetry"
      />

      <div
        v-else-if="displayMovies.length === 0 && !isLoading"
        class="flex flex-col items-center justify-center py-16 text-center"
      >
        <div class="rounded-full bg-muted p-6 mb-4">
          <Search class="h-12 w-12 text-primary" />
        </div>
        <h3 class="text-xl font-semibold mb-2 text-primary">No movies found</h3>
        <p class="text-muted-foreground max-w-md">
          {{
            isSearchMode
              ? `We couldn't find any movies matching "${searchQuery}". Try a different search term.`
              : 'No movies available at the moment.'
          }}
        </p>
      </div>

      <div v-else>
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-white">
            {{ isSearchMode ? 'Search Results' : 'All Movies' }}
          </h2>
          <p class="text-sm text-muted-foreground mt-1">
            {{ displayMovies.length }} movie{{ displayMovies.length !== 1 ? 's' : '' }} found
          </p>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
        >
          <MovieCard v-for="movie in displayMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </div>
    <div class="mt-8 flex justify-center" v-if="displayMovies.length > 0">
      <Button
        v-if="hasNextPage"
        @click="handleLoadMore"
        :disabled="isFetchingNextPage"
        class="px-6 py-3 bg-secondary text-primary curso rounded-full hover:bg-secondary/80 disabled:opacity-50 transition-all flex items-center gap-2"
      >
        <span
          v-if="isFetchingNextPage"
          class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
        ></span>

        {{ isFetchingNextPage ? 'Loading more...' : 'Load More Movies' }}
      </Button>

      <p v-else class="text-gray-500 mt-4">You've reached the end!</p>
    </div>
  </div>
</template>

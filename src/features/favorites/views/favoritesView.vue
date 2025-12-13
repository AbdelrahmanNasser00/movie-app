<script setup>
import { Heart } from 'lucide-vue-next'
import MovieCard from '@/components/MovieCard.vue'
import Button from '@/components/ui/button/Button.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useFavoritesStore } from '../stores/favorites'
import { computed } from 'vue'

const { favorites } = useFavoritesStore()
const hasFavorites = computed(() => favorites.length > 0)
</script>

<template>
  <div class="min-h-screen pb-12">
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-12 mt-8">
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <div class="bg-primary/10 p-3 rounded-xl">
            <Heart class="h-8 w-8 text-primary fill-primary" />
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-secondary">My Favorites</h1>
        </div>
        <p class="text-muted-foreground">
          {{
            hasFavorites
              ? `You have ${favorites.length} favorite movie${favorites.length !== 1 ? 's' : ''}`
              : 'Start adding movies to your favorites list'
          }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 md:px-8 mt-12">
      <!-- Loading State -->
      <LoadingSpinner v-if="isLoading" message="Loading your favorites..." />

      <!-- Error State -->
      <ErrorMessage
        v-else-if="error"
        title="Failed to load favorites"
        :message="error.message"
        @retry="refetch"
      />

      <!-- Empty State -->
      <div
        v-else-if="!hasFavorites"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <div class="bg-muted rounded-full p-8 mb-6">
          <Heart class="h-20 w-20 text-primary" />
        </div>
        <h2 class="text-2xl font-bold text-secondary mb-3">No favorites yet</h2>
        <p class="text-muted-foreground max-w-md mb-8">
          Start exploring movies and add them to your favorites by clicking the heart icon. Your
          favorite movies will appear here.
        </p>
        <Button
          @click="$router.push('/discover')"
          class="bg-primary hover:bg-primary/90 text-white px-6"
        >
          Discover Movies
        </Button>
      </div>

      <!-- Movies Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
      >
        <MovieCard v-for="movie in favorites" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

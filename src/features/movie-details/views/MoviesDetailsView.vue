<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Star, Calendar, Clock, Play, ExternalLink } from 'lucide-vue-next'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { Badge } from '@/components/ui/badge'
import Button from '@/components/ui/button/Button.vue'
import { useMovieDetails } from '../composables/useMovieDetails'
import { formatRuntime } from '@/utils/formatters'

const route = useRoute()
const movieId = computed(() => route.params.id)

const { movie, isLoading, error, refetch } = useMovieDetails(movieId)

const backdropUrl = computed(() => {
  return movie.value?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.value.backdrop_path}`
    : null
})

const posterUrl = computed(() => {
  return movie.value?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'
})

const releaseYear = computed(() => {
  return movie.value?.release_date ? movie.value.release_date.split('-')[0] : 'N/A'
})
</script>

<template>
  <div class="min-h-screen py-8">
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <LoadingSpinner message="Loading movie details..." />
    </div>

    <div v-else-if="error" class="flex items-center justify-center min-h-screen px-4">
      <ErrorMessage
        title="Failed to load movie details"
        :message="error.message"
        @retry="refetch"
      />
    </div>

    <!-- Movie Details -->
    <div v-else-if="movie">
      <!-- Hero Section -->
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Poster Column -->
          <div class="lg:col-span-1">
            <div class="sticky top-24">
              <img :src="posterUrl" :alt="movie.title" class="w-full rounded-2xl shadow-2xl" />
            </div>
          </div>

          <!-- Info Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Title & Tagline -->
            <div class="space-y-3">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary">
                {{ movie.title }}
              </h1>
              <p v-if="movie.tagline" class="text-xl text-muted-foreground italic">
                "{{ movie.tagline }}"
              </p>
            </div>

            <!-- Meta Info Bar -->
            <div class="flex flex-wrap items-center gap-4">
              <div class="flex items-center gap-2 bg-primary px-4 py-2 rounded-full">
                <Star class="h-5 w-5 fill-white text-white" />
                <span class="font-bold text-white text-lg">{{
                  movie.vote_average.toFixed(1)
                }}</span>
              </div>

              <div class="flex items-center gap-2 text-muted-foreground">
                <Calendar class="h-5 w-5" />
                <span class="font-medium">{{ releaseYear }}</span>
              </div>

              <div class="flex items-center gap-2 text-muted-foreground">
                <Clock class="h-5 w-5" />
                <span class="font-medium">{{ formatRuntime(movie.runtime) }}</span>
              </div>

              <div class="flex items-center gap-2 text-muted-foreground">
                <span class="font-medium">{{ movie.vote_count.toLocaleString() }} votes</span>
              </div>
            </div>

            <!-- Genres -->
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="genre in movie.genres"
                :key="genre.id"
                variant="secondary"
                class="px-4 py-1.5 text-sm font-medium"
              >
                {{ genre.name }}
              </Badge>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3">
              <Button
                v-if="movie.homepage"
                :href="movie.homepage"
                target="_blank"
                class="bg-primary hover:bg-primary/90 text-white px-6 cursor-pointer"
              >
                <Play class="h-5 w-5 mr-2" />
                Watch Now
              </Button>

              <Button
                v-if="movie.imdb_id"
                :href="`https://www.imdb.com/title/${movie.imdb_id}`"
                target="_blank"
                variant="outline"
                class="px-6 cursor-pointer text-foreground"
              >
                <ExternalLink class="h-5 w-5 mr-2" />
                View on IMDb
              </Button>
            </div>

            <!-- Overview -->
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-secondary">Overview</h2>
              <p class="text-lg text-muted-foreground leading-relaxed">
                {{ movie.overview }}
              </p>
            </div>

            <div v-if="backdropUrl" class="rounded-2xl overflow-hidden shadow-xl">
              <img :src="backdropUrl" :alt="movie.title" class="w-full h-auto" />
            </div>

            <div v-if="movie.production_companies?.length" class="space-y-6">
              <h2 class="text-2xl font-bold text-secondary">Production Companies</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  v-for="company in movie.production_companies"
                  :key="company.id"
                  class="rounded-xl p-6 border border-border flex items-center justify-center min-h-[100px] hover:border-primary/50 transition-colors"
                >
                  <img
                    v-if="company.logo_path"
                    :src="`https://image.tmdb.org/t/p/w200${company.logo_path}`"
                    :alt="company.name"
                    class="max-h-12 max-w-full object-contain filter dark:invert"
                  />
                  <p v-else class="text-sm text-muted-foreground text-center font-medium">
                    {{ company.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue'
import 'swiper/css'
import 'swiper/css/navigation'
import Button from './ui/button/Button.vue'

defineProps({
  movies: {
    type: Array,
    required: true,
  },
  header: {
    type: String,
    default: 'Trending Movies',
  },
  subheader: {
    type: String,
    default: '',
  },
  genres: {
    type: Array,
    default: () => [],
  },
  activeGenreId: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['filter'])

const handleGenreSelect = (id) => {
  emit('filter', id)
}
</script>

<template>
  <div class="py-8 max-w-7xl mx-auto">
    <div class="px-4 md:px-8 mb-4 space-y-2">
      <div>
        <h2 class="text-2xl font-bold text-white">{{ header }}</h2>
        <p v-if="subheader" class="text-muted-foreground text-sm mt-1">
          {{ subheader }}
        </p>
      </div>
      <div v-if="genres.length" class="flex gap-2 h-7">
        <Button
          v-for="genre in genres"
          :key="genre.id"
          @click="handleGenreSelect(genre.id)"
          variant="outline"
          class="text-sm h-auto text-white border-0 hover:bg-primary bg-gray-600/30 cursor-pointer"
          :class="[genre.id === activeGenreId ? 'bg-primary' : '']"
        >
          {{ genre.name }}
        </Button>
      </div>
    </div>

    <div
      class="w-full grid grid-rows-2 gap-4 grid-cols-1 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

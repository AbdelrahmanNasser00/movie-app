<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
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

    <div class="w-full px-6 md:px-8 overflow-hidden">
      <Swiper
        :modules="[Navigation, Autoplay]"
        :navigation="true"
        :loop="true"
        :space-between="10"
        :autoplay="{ delay: 5000, disableOnInteraction: true }"
        :breakpoints="{
          320: { slidesPerView: 2, spaceBetween: 12 },
          480: { slidesPerView: 2.5, spaceBetween: 12 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 3.5, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 16 },
          1536: { slidesPerView: 6, spaceBetween: 16 },
        }"
        class="movie-swiper"
      >
        <SwiperSlide v-for="movie in movies" :key="movie.id" class="h-auto">
          <MovieCard :movie="movie" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
.movie-swiper {
  overflow: visible;
  padding: 4px 0;
}

.movie-swiper :deep(.swiper-button-next),
.movie-swiper :deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.6);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: opacity 0.3s;
}

.movie-swiper :deep(.swiper-button-next):hover,
.movie-swiper :deep(.swiper-button-prev):hover {
  background: rgba(0, 0, 0, 0.8);
}

.movie-swiper :deep(.swiper-button-disabled) {
  opacity: 0.3;
}

@media (max-width: 640px) {
  .movie-swiper :deep(.swiper-button-next),
  .movie-swiper :deep(.swiper-button-prev) {
    display: none;
  }
}
</style>

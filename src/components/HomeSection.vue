<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import MovieCard from './MovieCard.vue'

import 'swiper/css'
import 'swiper/css/navigation'

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
})
</script>

<template>
  <div class="py-8 space-y-4 max-w-7xl mx-auto flex flex-col gap-12">
    <div class="px-4 md:px-8">
      <h2 class="text-2xl font-bold text-white">{{ header }}</h2>
      <p v-if="subheader" class="text-muted-foreground text-sm mt-1">
        {{ subheader }}
      </p>
    </div>

    <div class="w-full px-4 md:px-8 overflow-hidden">
      <Swiper
        :modules="[Navigation, Autoplay]"
        :navigation="true"
        :loop="true"
        :space-between="16"
        :autoplay="{ delay: 5000, disableOnInteraction: true }"
        :breakpoints="{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 24 },
        }"
        class="movie-swiper !overflow-visible"
      >
        <SwiperSlide v-for="movie in movies" :key="movie.id" class="h-auto">
          <MovieCard :movie="movie" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style>
.movie-swiper .swiper-button-next,
.movie-swiper .swiper-button-prev {
  color: white;
  background: rgba(0, 0, 0, 0.6);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: opacity 0.3s;
}

.swiper-navigation-icon {
  width: 10px !important;
  height: 10px;
}

.movie-swiper .swiper-button-disabled {
  opacity: 0.3;
}
</style>

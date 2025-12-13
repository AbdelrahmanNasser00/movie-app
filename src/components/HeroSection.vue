<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Play, Plus, Star } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

defineProps({
  movies: {
    type: Array,
    required: true,
  },
})

const getBackdropUrl = (path) => `https://image.tmdb.org/t/p/original${path}`
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <swiper
      :modules="[Autoplay, EffectFade, Pagination]"
      :effect="'fade'"
      :loop="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      class="h-full w-full"
    >
      <swiper-slide v-for="movie in movies" :key="movie.id">
        <div class="relative h-full w-full">
          <img
            :src="getBackdropUrl(movie.backdrop_path)"
            class="absolute inset-0 h-full w-full object-cover"
            alt="Movie Backdrop"
          />
          <div
            class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"
          ></div>

          <div class="absolute inset-0 container flex flex-col justify-center px-6 md:px-12">
            <div class="max-w-2xl space-y-4 animate-slide-up">
              <div class="flex items-center gap-3 text-white">
                <Badge class="bg-primary hover:bg-primary/90">FEATURED</Badge>
                <div class="flex items-center gap-1 text-yellow-400 font-bold">
                  <Star class="h-4 w-4 fill-current" />
                  <span>{{ movie.vote_average }}</span>
                </div>
                <span class="text-sm opacity-80"
                  >{{ movie.release_date.split('-')[0] }} • {{ movie.genre }}</span
                >
              </div>

              <h1 class="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
                {{ movie.title }}
              </h1>
              <p class="text-gray-200 text-lg line-clamp-2 md:line-clamp-3 max-w-xl drop-shadow-md">
                {{ movie.overview }}
              </p>

              <div class="flex gap-4 pt-4">
                <Button
                  size="lg"
                  class="gap-2 bg-primary hover:bg-primary/90 text-white cursor-pointer"
                >
                  <Play class="h-5 w-5 fill-current" /> Watch Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  class="gap-2 text-gray-900 border-white/30 cursor-pointer"
                >
                  <Plus class="h-5 w-5" /> My List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style>
.swiper-pagination-bullet {
  background: white;
  opacity: 0.5;
}
.swiper-pagination-bullet-active {
  background: var(--primary, #e11d48);
  opacity: 1;
}
</style>

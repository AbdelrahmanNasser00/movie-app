<script setup>
import HeroSection from '@/components/HeroSection.vue'
import HomeSection from '@/components/HomeSection.vue'
import SectionsWrapper from '@/components/SectionsWrapper.vue'
import { useTrendingMovies } from '@/features/trending-movies/composables/useTrendingMovies'

const { data, movies, isLoading, page, timeWindow } = useTrendingMovies('day')
</script>

<template>
  <HeroSection />
  <SectionsWrapper>
    <HomeSection
      :movies="movies ?? []"
      header="Trending Movies"
      subheader="Discover the latest trending movies"
    />
    <HomeSection
      :movies="movies ?? []"
      header="Popular Movies"
      subheader="Discover the latest popular movies"
    />
  </SectionsWrapper>
</template>

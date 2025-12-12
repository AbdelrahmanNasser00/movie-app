<script setup>
import { Search } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur border-b border-slate-800">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink to="/" class="text-2xl font-bold text-red-600"> Movies Light </RouterLink>

      <div class="hidden md:flex gap-6 text-sm font-medium text-slate-300">
        <RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink>
        <RouterLink to="/movies" class="hover:text-white transition-colors">Movies</RouterLink>
        <RouterLink to="/tv" class="hover:text-white transition-colors">TV Shows</RouterLink>
      </div>

      <div
        class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer"
      >
        <Search class="w-4 h-4 text-slate-300" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Heart, Search } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full transition-all duration-300 flex justify-center"
    :class="
      isScrolled
        ? 'bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-lg'
        : 'bg-transparent border-transparent py-2'
    "
  >
    <div class="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink to="/" class="text-2xl font-bold text-red-600"> Movies Light </RouterLink>

      <div class="hidden md:flex gap-6 text-sm font-medium text-slate-300">
        <RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink>
        <RouterLink to="/movies" class="hover:text-white transition-colors">Trending</RouterLink>
        <RouterLink to="/movies" class="hover:text-white transition-colors">Popular</RouterLink>
        <RouterLink to="/tv" class="hover:text-white transition-colors">TV Shows</RouterLink>
      </div>

      <div class="gap-2 flex">
        <RouterLink to="/discover">
          <div
            class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer"
          >
            <Search class="w-45 h-4 text-slate-300" />
          </div>
        </RouterLink>
        <RouterLink to="/favorites">
          <div
            class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer"
          >
            <Heart class="w-4 h-4 text-slate-300" />
          </div>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

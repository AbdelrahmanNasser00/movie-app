import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const favorites = ref([])

    const isFavorite = computed(() => (movieId) => {
      return favorites.value.some((movie) => movie.id === movieId)
    })

    const favoritesLength = computed(() => favorites.value.length)

    function toggleFavorite(movie) {
      console.log('Toggling favorite for movie:', movie)
      const index = favorites.value.findIndex((m) => m.id === movie.id)
      if (index === -1) {
        favorites.value.push(movie)
      } else {
        favorites.value.splice(index, 1)
      }
    }

    return {
      favorites,
      isFavorite,
      favoritesLength,
      toggleFavorite,
    }
  },
  { persist: true },
)

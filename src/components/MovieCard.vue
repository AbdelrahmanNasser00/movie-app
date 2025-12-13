<script setup>
import { computed } from 'vue'
import { Star, Calendar, Eye, Heart } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import Card from './ui/card/Card.vue'
import CardContent from './ui/card/CardContent.vue'
import { useRouter } from 'vue-router'
import Button from './ui/button/Button.vue'
import { useFavoritesStore } from '@/features/favorites/stores/favorites'
import { storeToRefs } from 'pinia'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const favoritesStore = useFavoritesStore()

const { isFavorite } = storeToRefs(favoritesStore)

const { toggleFavorite } = favoritesStore

const handleFavoriteClick = (event) => {
  console.log('55555555')
  event.stopPropagation()
  toggleFavorite(props.movie)
}

const imageUrl = computed(() => {
  return props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'
})

const releaseYear = computed(() => {
  return props.movie.release_date ? props.movie.release_date.split('-')[0] : 'N/A'
})

const popularityPercentage = computed(() => {
  return Math.min((props.movie.popularity / 100) * 100, 100)
})

const handleCardClick = () => {
  router.push({ name: 'MovieDetails', params: { id: props.movie.id } })
}
</script>

<template>
  <Card
    class="group relative cursor-pointer overflow-hidden rounded-2xl border-0 bg-transparent shadow-none transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
    @click="handleCardClick"
  >
    <div
      class="relative aspect-2/3 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-muted to-card"
    >
      <img
        :src="imageUrl"
        :alt="movie.title"
        class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
        loading="lazy"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <Badge
        class="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border-0 bg-gradient-to-r from-primary to-amber-500 px-3 py-1.5 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:bg-primary group-hover:scale-110"
      >
        <Star class="h-3.5 w-3.5 fill-white text-white" />
        <span class="text-sm font-bold text-white">
          {{ movie.vote_average ? movie.vote_average.toFixed(1) : '0.0' }}
        </span>
      </Badge>

      <Badge
        variant="secondary"
        class="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 backdrop-blur-md"
      >
        <Eye class="h-3 w-3 text-white/80" />
        <span class="text-xs font-medium text-white/90">{{ movie.vote_count }}</span>
      </Badge>

      <Button
        @click="handleFavoriteClick"
        size="sm"
        variant="outline"
        class="absolute top-15 right-2 p-2 rounded-full transition-colors z-10 cursor-pointer"
        :class="
          isFavorite(movie.id) ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-red-500'
        "
      >
        <Heart class="h-4 w-4" :class="{ 'fill-current': isFavorite(movie.id) }" />
      </Button>

      <div
        class="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0"
      >
        <p class="line-clamp-3 text-xs leading-relaxed text-white/90">
          {{ movie.overview }}
        </p>
      </div>
    </div>

    <CardContent
      class="rounded-b-2xl border-t border-primary/20 bg-gradient-to-b from-card to-card/80 p-4"
    >
      <h3
        class="mb-2 line-clamp-1 text-lg font-bold leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary"
        :title="movie.title"
      >
        {{ movie.title }}
      </h3>

      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar class="h-3.5 w-3.5 text-primary" />
        <span class="font-medium">{{ releaseYear }}</span>
        <span class="text-border">•</span>
        <span class="text-xs uppercase tracking-wide">{{ movie.original_language }}</span>
      </div>

      <div class="mt-3 space-y-1">
        <div class="flex items-center justify-between text-xs">
          <span class="text-muted-foreground">Popularity</span>
          <span class="font-medium text-primary">{{ movie.popularity.toFixed(1) }}</span>
        </div>
        <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            class="h-full rounded-full bg-gradient-to-r from-primary to-amber-500 transition-all duration-500"
            :style="{ width: `${popularityPercentage}%` }"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { computed } from 'vue'

import { Badge } from '@/components/ui/badge'
import Card from './ui/card/Card.vue'
import CardHeader from './ui/card/CardHeader.vue'
import { Calendar, Star } from 'lucide-vue-next'
import CardTitle from './ui/card/CardTitle.vue'
import CardContent from './ui/card/CardContent.vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const imageUrl = computed(() => {
  return props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${props.movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image'
})

const releaseYear = computed(() => {
  return props.movie.release_date ? props.movie.release_date.split('-')[0] : 'Unknown'
})
</script>

<template>
  <Card class="flex w-full overflow-hidden transition-colors hover:bg-accent/40 cursor-pointer">
    <div class="h-auto w-24 sm:w-32 shrink-0 bg-muted">
      <img :src="imageUrl" :alt="movie.title" class="h-full w-full object-cover" loading="lazy" />
    </div>

    <div class="flex flex-1 flex-col justify-between py-2">
      <CardHeader class="p-4 pb-2">
        <div class="flex justify-between items-start gap-2">
          <CardTitle class="text-lg font-bold leading-tight">
            {{ movie.title }}
          </CardTitle>

          <Badge
            variant="outline"
            class="flex gap-1 shrink-0 border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
          >
            <Star class="h-3 w-3 fill-current" />
            <span>{{ movie.vote_average ? movie.vote_average.toFixed(1) : '0.0' }}</span>
          </Badge>
        </div>

        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar class="h-3.5 w-3.5" />
          <span>{{ releaseYear }}</span>
        </div>
      </CardHeader>

      <CardContent class="p-4 pt-0">
        <p class="line-clamp-2 text-sm text-muted-foreground">
          {{ movie.overview || 'There is no description available for this movie.' }}
        </p>
      </CardContent>
    </div>
  </Card>
</template>

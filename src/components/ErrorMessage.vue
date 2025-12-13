<script setup>
import { AlertCircle } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    default: 'Something went wrong',
  },
  message: {
    type: String,
    default: 'Unable to load content. Please try again later.',
  },
})

defineEmits(['retry'])
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center"
  >
    <div class="rounded-full bg-destructive/10 p-3">
      <AlertCircle class="h-8 w-8 text-destructive" />
    </div>
    <div class="space-y-2">
      <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
      <p class="text-sm text-muted-foreground">{{ message }}</p>
    </div>
    <button
      @click="$emit('retry')"
      class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      Try Again
    </button>
  </div>
</template>

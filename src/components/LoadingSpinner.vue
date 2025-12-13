<script setup>
import { Loader2 } from 'lucide-vue-next'

defineProps({
  message: {
    type: String,
    default: 'Loading...',
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-12">
    <Loader2 class="h-12 w-12 animate-spin text-primary" />
    <p class="text-sm text-muted-foreground">{{ message }}</p>
  </div>
</template>

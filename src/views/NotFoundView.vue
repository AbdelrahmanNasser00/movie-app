<script setup>
import { useRouter } from 'vue-router'
import { Film, Home, Search, ArrowLeft } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}

const goToDiscover = () => {
  router.push('/discover')
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-16">
    <div class="max-w-2xl text-center">
      <!-- 404 Animation -->
      <div class="relative mb-8">
        <div class="flex items-center justify-center gap-4">
          <span class="text-8xl font-bold text-primary md:text-9xl animate-pulse">4</span>
          <div class="relative">
            <Film class="h-24 w-24 text-primary animate-bounce md:h-32 md:w-32" />
            <div class="absolute inset-0 animate-ping">
              <Film class="h-24 w-24 text-primary opacity-20 md:h-32 md:w-32" />
            </div>
          </div>
          <span class="text-8xl font-bold text-primary md:text-9xl animate-pulse">4</span>
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="mb-4 text-3xl font-bold text-secondary md:text-4xl">Page Not Found</h1>
      <p class="mb-8 text-lg text-muted-foreground">
        Oops! Looks like this page went off-script. The page you're looking for doesn't exist or has
        been moved.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          @click="goHome"
          class="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          <Home class="mr-2 h-4 w-4" />
          Go to Homepage
        </Button>

        <Button
          @click="goToDiscover"
          variant="outline"
          class="border-border text-primary cursor-pointer"
        >
          <Search class="mr-2 h-4 w-4" />
          Discover Movies
        </Button>

        <Button @click="goBack" variant="ghost" class="hover:bg-accent cursor-pointer">
          <ArrowLeft class="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>

      <!-- Suggestions -->
      <div class="mt-12 rounded-xl border border-border bg-card p-6">
        <h3 class="mb-3 text-lg font-semibold text-foreground">What you can do:</h3>
        <ul class="space-y-2 text-left text-sm text-muted-foreground">
          <li class="flex items-start gap-2">
            <span class="text-primary">•</span>
            <span>Check the URL for typos</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary">•</span>
            <span>Return to the homepage and start fresh</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary">•</span>
            <span>Use the search to find what you're looking for</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary">•</span>
            <span>Explore our trending and popular movies</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>

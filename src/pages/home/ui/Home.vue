<template>
  <div class="mx-auto w-[90%] flex flex-col justify-center px-6 py-8 duration-500">
    <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <!-- Carousel -->
      <div>carousel</div>

      <!-- General -->
      <div>General features</div>

      <!-- Popular Templates -->
      <div>Get started with Templates</div>

      <!-- Projects -->
      <div>Projects</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Home | Welcome!'
})
</script>

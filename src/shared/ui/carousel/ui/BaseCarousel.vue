<template>
  <div v-bind="attrs">
    <carousel :items-to-show="1" class="p-4 h-full flex flex-col items-center justify-between">
      <slide
        v-for="slide in slides"
        :key="slide.id"
        class="flex flex-col items-end justify-between h-full"
      >
        <h2 class="text-4xl">{{ slide.title }}</h2>
        <p>{{ slide.description }}</p>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import type { ISlide } from '../model'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const attrs = useAttrs()

const props = defineProps<{
  navigation?: boolean
  pagination?: boolean
  items: ISlide[] | null
}>()

const slides = computed(() => props.items)
</script>

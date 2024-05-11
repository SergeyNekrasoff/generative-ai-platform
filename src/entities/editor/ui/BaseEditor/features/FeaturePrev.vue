<template>
  <div class="relative xss:hidden">
    <button
      id="nodePrev"
      type="button"
      role="button"
      class="w-[36px] h-[36px] text-text_dark_2 border-divider_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      @click="click"
    >
      <ArrowLongLeftIcon class="h-5 w-5 text-text_dark_2" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'

const emits = defineEmits(['to-prev'])

const click = () => {
  emits('to-prev')
}
</script>

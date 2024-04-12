<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

interface INameIcon {
  component?: string
}

const props = defineProps<INameIcon>()
const currentComponent = computed(() => props.component)
console.log(`currentComponent: ${currentComponent}`)
</script>

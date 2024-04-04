<template>
  <div class="flex items-center mx-4">
    <button @click="toggleDark()">
      <template v-if="isDark">
        <SunIcon class="h-6 w-6" />
      </template>
      <template v-else>
        <MoonIcon class="h-6 w-6" />
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { MoonIcon } from '@heroicons/vue/24/solid'
import { SunIcon } from '@heroicons/vue/24/solid'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

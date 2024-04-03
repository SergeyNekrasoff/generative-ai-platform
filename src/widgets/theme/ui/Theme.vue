<template>
  <div>
    <button v-if="isDark" @click="toggleDark">White</button>
    <button v-else @click="toggleDark">Dark</button>
    {{ isDark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny' }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

console.log(`isDark: ${isDark.value}`)
// const currentTheme = computed((): any => isDark.value)
</script>

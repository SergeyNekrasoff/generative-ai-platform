<template>
  <header class="header py-4 top-0 z-[600]">
    <div
      class="container mx-auto flex items-center justify-between xss:max-w-full s:max-w-full xss:p-2 s:p-2 m:max-w-[1280px] m:p-4 m:py-2.5 s:!py-3 xss:py-3"
    >
      <div
        class="relative flex items-center justify-start self-center mr-4 s:mr-0_ header_610:mr-0 s:flex-row-reverse_ header_610:flex-row-reverse"
      >
        <a href="/" class="flex items-center justify-start text-nutty"> textailor </a>
      </div>
      <button @click="toggleDark()">
        <template v-if="isDark">
          <SunIcon class="h-6 w-6 text-blue-500" />
        </template>
        <template v-else>
          <MoonIcon class="h-6 w-6 text-blue-500" />
        </template>
      </button>
    </div>
    <!-- <Theme /> -->
  </header>
</template>

<script setup lang="ts">
// import { Theme } from '@/widgets/theme'
import { MoonIcon } from '@heroicons/vue/24/solid'
import { SunIcon } from '@heroicons/vue/24/solid'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss">
@import 'styles';
</style>

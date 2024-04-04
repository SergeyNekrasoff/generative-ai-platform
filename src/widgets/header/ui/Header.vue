<template>
  <header class="header">
    <div class="flex items-center justify-end p-4">
      <div class="flex items-center justify-center w-[90%]">
        <div
          class="flex justify-center min-w-[50%] text-center rounded-full border border-divider_dark_1 py-1.5 text-lg font-bold"
        >
          HOME
        </div>
      </div>
      <div class="flex items-center justify-end">
        <button type="button">
          <BellIcon class="h-6 w-6 pointer" @click="toggleNotification" />
        </button>
        <Theme />
        <button type="button">
          <QuestionMarkCircleIcon class="h-6 w-6 pointer" @click="toggleHelp" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Theme } from '@/widgets/theme'
import { BellIcon } from '@heroicons/vue/24/solid'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/solid'

const toggleNotification = (): void => {
  console.log(`toggle notifications`)
}

const toggleHelp = (): void => {
  console.log(`toggle help`)
}
</script>

<style lang="scss">
@import 'styles';
</style>

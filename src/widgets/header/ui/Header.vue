<template>
  <header class="header border-b border-divider_dark_2">
    <div class="flex items-center justify-between h-8">
      <Logo class="scale-[0.9]" />
      <div class="flex items-center justify-center w-1/3">
        <div
          class="flex justify-center min-w-[40%] text-center rounded-lg border border-divider_dark_2 py-1 text-base font-bold ml-4 text-gray_dark_1"
        >
          {{ routeName }}
        </div>
      </div>
      <div class="flex items-center justify-end">
        <button type="button">
          <BellIcon class="h-5 w-5 pointer" @click="toggleNotification" />
        </button>
        <Theme />
        <button type="button">
          <QuestionMarkCircleIcon class="h-5 w-5 pointer" @click="toggleHelp" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Theme } from '@/widgets/theme'
import { Logo } from '@/shared/ui/logo'
import { BellIcon } from '@heroicons/vue/24/solid'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const toggleNotification = (): void => {
  console.log(`toggle notifications`)
}

const toggleHelp = (): void => {
  console.log(`toggle help`)
}

const route = useRoute()

const routeName = computed(() => route.meta.head)
</script>

<style lang="scss">
@import 'styles';
</style>

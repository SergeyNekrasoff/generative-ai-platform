<template>
  <section class="pr-6">
    <h2 class="mb-8">Buttons</h2>

    <BaseButton class="mb-4" :disabled="isDisabled">
      <template v-slot:icon>
        <RectangleStackIcon
          class="h-4 w-4 mr-2 text-text_dark_2"
          :class="{ 'text-divider_dark_1': isDisabled }"
        />
      </template>
      Show All
    </BaseButton>

    <BaseButton class="mb-4" :primary="true">
      <template v-slot:icon>
        <RectangleStackIcon class="h-4 w-4 mr-2 text-text_dark_2" />
      </template>
      Subscribe
    </BaseButton>

    <BaseButton class="mb-4 w-1/2" :solid="true"> Send </BaseButton>

    <BaseButton class="mb-4 w-3/4">
      <template v-slot:icon>
        <ArrowDownTrayIcon class="h-4 w-4 mr-2 text-text_dark_2" />
      </template>
      Download
    </BaseButton>
  </section>
</template>
<script setup lang="ts">
import { BaseButton } from '@/shared/ui/buttons'
import { RectangleStackIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/solid'
import useToggle from '@/shared/lib/use/useToggle'

const { isActive: isDisabled, toggle } = useToggle(true)
</script>

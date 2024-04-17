<template>
  <section>
    <h2 class="mb-s">Buttons</h2>

    <BaseButton class="mb-s" txt="toggle disabled" @click="toggle" />

    <BaseButton>
      <template v-slot:icon>
        <RectangleStackIcon class="h-4 w-4 mr-2 text-text_dark_2" />
      </template>

      Show All
    </BaseButton>
  </section>
</template>
<script setup lang="ts">
import { BaseButton } from '@/shared/ui/buttons'
import { RectangleStackIcon } from '@heroicons/vue/24/solid'
import useToggle from '@/shared/lib/use/useToggle'

const texts: string[] = ['BUTTON', 'HOVER', 'FOCUS', 'DISABLED', 'ACTIVE']

const { isActive: isDisabled, toggle } = useToggle(true)
</script>

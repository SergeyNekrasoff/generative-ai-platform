<template>
  <div class="mx-auto w-[90%] flex flex-col justify-center px-6 py-8 duration-500">
    <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <div class="flex items-center justify-between mb-20">
        <div class="text-2xl">UI KIT</div>
      </div>

      <div class="grid grid-cols-5 gap-4">
        <InputStyles />

        <CheckboxStyles />

        <RadioStyles />

        <ButtonStyles />

        <LoaderStyles />

        <PaginationStyles />

        <DropdownStyles :items="['item1', 'item2', 'item3']" />

        <ToastStyles />

        <ModalsStyles />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { scrollTop } from '@/shared/lib/dom'
import { onBeforeMount } from 'vue'
import InputStyles from '@/pages/ui-kit/ui/InputStyles.vue'
import CheckboxStyles from '@/pages/ui-kit/ui/CheckboxStyles.vue'
import RadioStyles from '@/pages/ui-kit/ui/RadioStyles.vue'
import ButtonStyles from '@/pages/ui-kit/ui/ButtonStyles.vue'
import LoaderStyles from '@/pages/ui-kit/ui/LoaderStyles.vue'
import DropdownStyles from '@/pages/ui-kit/ui/DropdownStyles.vue'
import ToastStyles from '@/pages/ui-kit/ui/ToastStyles.vue'
import ModalsStyles from '@/pages/ui-kit/ui/ModalsStyles.vue'
import { PaginationStyles } from '@/pages/ui-kit/ui/PaginationStyles'

onBeforeMount(scrollTop)
</script>

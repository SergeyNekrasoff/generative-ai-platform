<template>
  <BaseModal @close="$emit('close')">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div class="modal__header">
          <div class="text-lg font-semibold leading-none tracking-tight mb-2">
            Invite your friends
          </div>
          <span class="text-sm text-muted-foreground">
            Share textailor.io with your friends and get rewarded!
          </span>
        </div>
        <div class="modal__body">
          <slot> </slot>
        </div>
        <button
          type="button"
          class="modal__btn"
          kind="outline"
          theme="gray"
          @click="$emit('close')"
        >
          <XMarkIcon class="h-5 w-5 mr-2 text-gray_light_4" />
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { XMarkIcon } from '@heroicons/vue/24/solid'

import BaseModal from '@/shared/ui/modal/base/BaseModal.vue'

const emit = defineEmits(['close'])

const modalRef = ref()

onClickOutside(modalRef, () => {
  emit('close')
})
</script>

<style lang="scss" scoped>
@import 'styles';
</style>

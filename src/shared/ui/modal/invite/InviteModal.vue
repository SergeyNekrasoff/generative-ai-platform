<template>
  <BaseModal @close="$emit('close')">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div class="modal__header">Invite</div>
        <div class="modal__body">
          <slot> content </slot>
        </div>
        <div class="modal__footer">
          <button
            type="button"
            class="modal__btn"
            kind="outline"
            theme="gray"
            @click="$emit('close')"
          >
            close
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

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

<template>
  <teleport to="body">
    <div class="modal">
      <div ref="modalRef" class="modal__inner">
        <div v-if="$slots.header" class="modal__header">
          <slot name="header"></slot>
        </div>
        <div class="modal__body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
// import { targetTeleport } from '@/composable/useModal'

const emit = defineEmits(['close'])
const modalRef = ref(null)

onClickOutside(modalRef, () => {
  emit('close')
})
</script>

<style lang="scss">
@import 'styles';
</style>

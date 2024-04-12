<template>
  <div>
    <teleport to="body">
      <div v-if="isOpen" class="toast">
        <div
          v-for="({ message, type }, index) in messageList"
          :key="index"
          class="toast__message"
          :class="[`toast__message_type-${type}`]"
        >
          <component
            :is="iconName(type)"
            class="h-5 w-5 mr-2 text-text_dark_2"
            @click="close(message)"
          />
          <div class="toast__text">{{ message }}</div>
          <XCircleIcon
            class="h-5 w-5 text-text_dark_2 hover:text-white_soft cursor-pointer"
            @click="close(message)"
          />
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/shared/ui/toast/model/useToast'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { InformationCircleIcon } from '@heroicons/vue/24/solid'
import { NoSymbolIcon } from '@heroicons/vue/24/solid'
import { XCircleIcon } from '@heroicons/vue/24/solid'

const { isOpen, messageList, close } = useToast()

const iconName = (type: string | undefined) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return NoSymbolIcon
    case 'info':
      return InformationCircleIcon
    default:
      return ''
  }
}
</script>

<style lang="scss">
@import './styles.scss';
</style>

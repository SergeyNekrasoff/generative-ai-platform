import { ref } from 'vue'
import type { Ref } from 'vue'

interface ToastMessage {
  message: string
  type?: string
}

interface ToastOptions extends ToastMessage {
  duration?: number
}

export interface ToastResult {
  closeToast: () => void
}

export interface UsableToast {
  isOpen: Ref<boolean>
  messageList: Ref<ToastMessage[]>
  toast: (params: ToastOptions) => ToastResult
  close: (message: string) => void
}

const isOpen = ref(false)
const messageList = ref<ToastMessage[]>([])

const toast = ({ message, type = '', duration = 205000 }: ToastOptions) => {
  isOpen.value = true
  messageList.value = [...messageList.value, { message, type }]

  setTimeout(
    () => {
      isOpen.value = Boolean(messageList.value.length)
      messageList.value = messageList.value.slice(1)
    },
    duration ?? Math.pow(2, 31) - 1
  )

  return { closeToast: () => close(message) }
}

const close = (message: string): void => {
  messageList.value = messageList.value.filter((x) => x.message !== message)
  isOpen.value = Boolean(messageList.value.length)
}

export const useToast = (): UsableToast => {
  return {
    close,
    toast,
    isOpen,
    messageList
  }
}

<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Add Link</span>
    </transition>
    <button
      id="nodeLink"
      type="button"
      role="button"
      ref="nodeLink"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <LinkIcon
        class="h-5 w-5 text-text_dark_2"
        :class="getCurrentModal ? 'text-gray_light_3' : ''"
      />
    </button>

    <!-- Modal -->
    <div
      v-if="visibleLink && getCurrentModal"
      class="absolute w-[320px] xss:-left-2 s:left-0 m:-left-10 flex flex-col items-start justify-start rounded-lg border-[1px] border-shade bg-white pb-4 shadow-md z-50 p-4"
    >
      dfsdfd sdf fdsf sdf
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { isValidURL } from '@/shared/lib/utils/validUrl'
import { useElementHover } from '@vueuse/core'
import { LinkIcon } from '@heroicons/vue/24/solid'

const emits = defineEmits(['open-modal', 'add-text-link'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleLink: Ref<boolean> = ref(false)
const nodeLink: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeLink)
const urlPath: Ref<string> = ref('')
const urlText: Ref<string> = ref('')

const errorMessage: Ref<string> = ref('')
const isValidTextLink: Ref<boolean> = ref(false)

const toggle = () => {
  visibleLink.value = !visibleLink.value
  emits('open-modal', 'text-link')
  getSelectionText()
}

const close = () => {
  visibleLink.value = false
  removeUrl()
  removeText()
}

const removeUrl = () => {
  urlPath.value = ''
}

const removeText = () => {
  urlText.value = ''
}

const sendTextLink = () => {
  emits('add-text-link', { href: urlPath.value, text: urlText.value })
  urlPath.value = ''
  urlText.value = ''
  visibleLink.value = false
}

const getSelectionText = () => {
  let selection: any
  selection = window.getSelection()
  const anchorNode = selection.anchorNode.parentNode.tagName
  const path = selection.anchorNode.parentNode

  if (selection !== null) {
    urlText.value = selection.getRangeAt(0)
  }

  if (anchorNode === 'A') {
    urlPath.value = path
    urlText.value = selection.anchorNode.parentNode.textContent
  }
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-link'
})

const hasError = computed(() => {
  return !urlPath.value || !isValidURL(urlPath.value)
})

watch(
  () => urlPath.value,
  (value) => {
    if (value && !isValidURL(value)) {
      errorMessage.value = 'This field should contain link like a https://...'
      isValidTextLink.value = false
    } else {
      errorMessage.value = ''
      isValidTextLink.value = true
    }
  }
)
</script>

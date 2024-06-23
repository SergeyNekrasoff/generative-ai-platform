<template>
  <div class="relative xss:hidden z-50">
    <transition name="slide-fade">
      <span v-if="isHovered && !visibleLink" class="feature-tooltip">Add Link</span>
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
      ref="textLinkRef"
      class="absolute w-[320px] xss:-left-2 s:left-0 m:-left-[330px] -top-[20px] flex flex-col items-start justify-start border bg-divider_light_2 border-black_mute rounded-lg p-4 z-[1000]"
    >
      <div class="flex items-start justify-between w-full relative">
        <div class="flex flex-col items-start justify-start">
          <input
            v-model="urlPath"
            type="text"
            name="url-path"
            class="h-10 rounded-md border border-solid border-shade px-2 text-accent hover:outline-none focus:outline-none focus-visible:outline-none active:outline-none xss:text-xs s:text-sm m:text-sm"
          />
          <transition name="slide-fade">
            <span v-if="!urlPath || !isValidURL(urlPath)" class="mt-1 text-xs text-red_dark">
              <!-- {{ errorMessage }} -->
              This field should contain link like a https://...
            </span>
          </transition>
        </div>
        <BaseButton
          class="border border-divider_dark_1"
          :disabled="!urlPath || !isValidTextLink"
          @click="addTextLink"
        >
          Add
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { BaseButton } from '@/shared/ui/buttons'
import { isValidURL } from '@/shared/lib/utils/validUrl'
import { useElementHover, onClickOutside } from '@vueuse/core'
import { LinkIcon } from '@heroicons/vue/24/solid'

const emits = defineEmits(['open-modal', 'add-text-link'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()
const textLinkRef: Ref<HTMLDivElement | null> = ref(null)

const visibleLink: Ref<boolean> = ref(false)
const nodeLink: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeLink)
const urlPath: Ref<string> = ref('')

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
}

const removeUrl = () => {
  urlPath.value = ''
}

const addTextLink = () => {
  emits('add-text-link', { href: urlPath.value })
  close()
}

const getSelectionText = () => {
  let selection: any
  selection = window.getSelection()

  if (selection === null) return

  const anchorNode = selection.anchorNode.parentNode.tagName
  const path = selection.anchorNode.parentNode

  if (anchorNode === 'A') {
    urlPath.value = path
  }
}

onClickOutside(textLinkRef, () => {
  close()
})

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'text-link'
})

const hasError = computed(async () => {
  const test = await isValidURL(urlPath.value)
  console.log(`test: ${test}`)
  return !urlPath.value
  // return !urlPath.value || !isValidURL(urlPath.value)
})

// watch(
//   () => urlPath.value,
//   (value) => {
//     if (value && !isValidURL(value)) {
//       console.log(`1`)
//       errorMessage.value = 'This field should contain link like a https://...'
//       isValidTextLink.value = false
//     } else {
//       console.log(`2`)
//       errorMessage.value = ''
//       isValidTextLink.value = true
//     }
//   }
// )
</script>

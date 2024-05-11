<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Link</span>
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
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import { LinkIcon } from '@heroicons/vue/24/solid'

const emits = defineEmits(['open-modal', 'add-link'])

interface IProps {
  currentModal: string
}

const props = defineProps<IProps>()

const visibleLink: Ref<boolean> = ref(false)
const nodeLink: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeLink)

const toggle = () => {
  visibleLink.value = !visibleLink.value

  emits('add-link')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'image'
})

watch(
  () => visibleLink.value,
  (value) => {
    if (value) {
      emits('open-modal', 'add-link')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>

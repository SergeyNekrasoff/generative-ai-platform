<template>
  <div class="relative xss:hidden">
    <transition name="slide-fade">
      <span v-if="isHovered" class="feature-tooltip">Image</span>
    </transition>
    <button
      id="nodeImage"
      type="button"
      role="button"
      ref="nodeImage"
      class="w-[36px] h-[36px] text-text_dark_2 flex items-center justify-center rounded-lg p-1 transition hover:bg-divider_dark_2"
      :class="getCurrentModal ? 'bg-gray_dark_2' : ''"
      @click="toggle"
    >
      <PhotoIcon
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
import { PhotoIcon } from '@heroicons/vue/24/solid'

const emits = defineEmits(['open-modal', 'upload'])

interface IProps {
  maxSize: number
  accept: string
  currentModal: string
}

const props = withDefaults(defineProps<IProps>(), {
  maxSize: 0,
  accept: 'default',
  currentModal: 'image/*'
})

const visibleImage: Ref<boolean> = ref(false)
const nodeImage: Ref<HTMLDivElement | null> = ref(null)
const isHovered = useElementHover(nodeImage)

const toggle = () => {
  visibleImage.value = !visibleImage.value

  emits('upload')
}

const getCurrentModal = computed(() => {
  return props.currentModal && props.currentModal === 'image'
})

watch(
  () => visibleImage.value,
  (value) => {
    if (value) {
      emits('open-modal', 'upload')
    } else {
      emits('open-modal', '')
    }
  }
)
</script>

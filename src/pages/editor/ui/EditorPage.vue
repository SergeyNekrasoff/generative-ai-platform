<template>
  <div class="w-full flex flex-col justify-center duration-500 h-[calc(100vh-48px)] pb-16">
    <div
      class="absolute bottom-0 left-0 right-0 w-full border-t border-text_dark_4 p-4 h-8 flex items-center justify-end"
    >
      <span class="text-xs text-divider_dark_3 mr-2">0 words</span>
      <span class="text-base text-black_mute mr-2">•</span>
      <span class="text-xs text-divider_dark_3">0 characters</span>
    </div>
    <div class="mx-auto w-[80%] max-w-[1280px] px-6 py-8">
      <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto h-[calc(100vh-60px)] pt-12">
        <BaseEditor
          class="w-full"
          :mode="ModeEditor.ADVANCED"
          :placeholder="'Start typing, copy or paste to get started...'"
          :typeSubmit="TYPE_SUBMIT.BUTTON"
          @send="save"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { BaseEditor } from '@/entities/editor'
import { ModeEditor, TYPE_SUBMIT } from '@/entities/editor/model/types'

const save = (value) => {
  console.log(`content: ${value}`)
}
</script>

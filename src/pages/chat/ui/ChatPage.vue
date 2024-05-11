<template>
  <div class="mx-auto w-full grid grid-cols-7">
    <div class="chat">
      <div class="chat__inner">
        <div class="flex flex-col items-center justify-center pt-48">
          <ChatBubbleLeftEllipsisIcon class="h-24 w-24 mb-4 text-text_dark_4" />
          <div class="text-4xl font-semibold mb-4">Welcome to Chat</div>
          <div class="text-sm font-[400] text-gray_light_1 text-center w-2/3">
            Get started by writing a task and Chat can do the rest. Not sure where to start? Check
            out the Prompt Library for inspiration.
          </div>
        </div>
        <div>
          <BaseFormInput
            :model-value="inputValue"
            :name="'search'"
            :input-type="'text'"
            :is-disabled="isDisabled"
            placeholder="Message..."
            @update:model-value="handleChange"
            @blur="handleBlur"
          >
            <template #postfix>
              <PaperAirplaneIcon class="h-4 w-4 ml-2 text-text_dark_2" />
            </template>
          </BaseFormInput>
        </div>
      </div>
    </div>
    <div class="chat-editor">
      <BaseEditor
        class="w-full"
        :mode="ModeEditor.ADVANCED"
        :placeholder="'Start typing, copy or paste to get started...'"
        @send="save"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/solid'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import { BaseEditor } from '@/entities/editor'
import { ModeEditor } from '@/entities/editor/model/types'

import { BaseFormInput } from '@/shared/ui/form/base'

const inputValue: Ref<string> = ref('')
const isDisabled: Ref<boolean> = ref(false)

const handleChange = () => console.log(`handle change`)
const handleBlur = () => console.log(`handle blur`)

const save = (value) => {
  console.log(`content: ${value}`)
}
</script>

<style lang="scss">
@import 'styles';
</style>

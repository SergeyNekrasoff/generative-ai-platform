<template>
  <div class="base-input" :class="classes">
    <label v-if="label" class="base-input__label" :for="name">
      {{ label }}
    </label>

    <div class="base-input__wrap">
      <div v-if="$slots.prefix" class="base-input__prefix">
        <slot name="prefix"></slot>
      </div>

      <input
        ref="input"
        :value="modelValue"
        class="base-input__field"
        :type="inputType"
        :name="name"
        :placeholder="placeholder"
        :disabled="isDisabled"
        autocomplete="false"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
      />

      <div v-if="$slots.postfix" class="base-input__postfix">
        <slot name="postfix"></slot>
      </div>
    </div>

    <small v-if="error" class="base-input__error">
      {{ error }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRefValue } from '@/shared/lib/use/base/useRefValue'
import type { TInputType } from './types'

const emit = defineEmits(['update:modelValue', 'blur', 'change'])

interface IBaseInput {
  modelValue?: string | number
  label?: string
  name?: string
  isDisabled?: boolean
  placeholder?: string
  inputType?: TInputType
  error?: string
}

const props = withDefaults(defineProps<IBaseInput>(), {
  modelValue: '',
  inputType: 'text',
  placeholder: ''
})

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.error
}))

const { value: inputValue, setValue } = useRefValue(props.modelValue)

function onInput(event: Event) {
  const value = getValue(event)
  setValue(value)

  emit('update:modelValue', value)
}

function onBlur() {
  emit('blur', inputValue.value)
}

function onChange() {
  emit('change', inputValue.value)
}

function getValue(event: Event) {
  const target = event.target as HTMLInputElement
  return target.value.trim()
}
</script>

<style lang="scss">
@import 'styles/index';
</style>

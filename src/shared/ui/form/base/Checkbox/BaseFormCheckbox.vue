<template>
  <label class="base-checkbox" :class="classes">
    <input
      v-model="model"
      type="checkbox"
      class="base-checkbox__input"
      :name="name"
      :disabled="isDisabled"
      :value="value"
    />

    <span class="base-checkbox__icon-wrap">
      <IconBg v-if="modelValue" class="base-checkbox__icon-bg" />
      <IconChecked v-else class="base-checkbox__icon-checked" />
    </span>

    <span v-if="$slots.default" class="base-checkbox__label">
      <slot></slot>
    </span>

    <small v-if="error" class="base-checkbox__error">{{ error }}</small>
  </label>
</template>

<script setup lang="ts">
import IconBg from './icons/IconBg.vue'
import IconChecked from './icons/IconChecked.vue'
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

interface IBaseCheckbox {
  value?: string | number
  modelValue: boolean | string[] | number[] | undefined
  name?: string
  isDisabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<IBaseCheckbox>(), {
  value: undefined
})

const model = computed({
  get(): IBaseCheckbox['modelValue'] {
    return props.modelValue
  },

  set(value: IBaseCheckbox['modelValue']) {
    emit('update:modelValue', value)
  }
})

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.error
}))
</script>

<style lang="scss">
@import 'styles/index';
</style>

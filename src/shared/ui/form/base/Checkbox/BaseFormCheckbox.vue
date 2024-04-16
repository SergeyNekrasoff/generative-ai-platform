<template>
  <label class="base-checkbox" :class="classes">
    <input
      type="base-checkbox"
      class="base-checkbox__input"
      :name="name"
      :checked="modelValue"
      :disabled="isDisabled"
      @change.prevent="onChange"
    />

    <span class="base-checkbox__icon-wrap">
      <IconBg class="base-checkbox__icon-bg abs-center" />
      <IconChecked class="base-checkbox__icon-checked abs-center" />
    </span>

    <span v-if="label" class="base-checkbox__label">
      {{ label }}
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
  modelValue?: boolean
  label?: string
  name?: string
  isDisabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<IBaseCheckbox>(), {
  modelValue: false
})

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.error
}))

function onChange() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss">
@import 'styles/index';
</style>

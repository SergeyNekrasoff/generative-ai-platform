<template>
  <label class="radio-item" :class="classes">
    <input
      class="radio-item__input"
      type="radio"
      :name="name"
      :value="item.value"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="onChange"
    />

    <span class="radio-item__icon-wrap">
      <IconBg v-if="!isChecked" class="radio-item__icon-bg" />
      <IconChecked v-else class="radio-item__icon-checked" />
    </span>

    <span class="radio-item__label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import type { IRadioItem } from '../types'
import IconBg from './icons/IconBg.vue'
import IconChecked from './icons/IconChecked.vue'
import { computed } from 'vue'

const emit = defineEmits(['change'])

interface IRadio {
  item: IRadioItem
  name?: string
  isDisabled?: boolean
  isError?: boolean
  isChecked: boolean
}

const props = defineProps<IRadio>()

const classes = computed(() => ({
  'disabled events-none': props.isDisabled,
  error: props.isError
}))

const label = computed(() => props.item.label || props.item.value)

const onChange = () => {
  emit('change', props.item)
}
</script>

<style lang="scss">
@import 'styles';
</style>

<template>
  <button
    v-bind="attrs"
    type="button"
    class="button-base"
    :class="[disabled && `button-base__disabled`]"
    :disabled="disabled"
    @click.stop.prevent="click"
  >
    <slot name="icon"></slot>

    <span v-if="$slots.default" class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

interface IButtonBase {
  text?: string
  disabled?: boolean
}

const emits = defineEmits(['click'])

const attrs = useAttrs()

const props = withDefaults(defineProps<IButtonBase>(), {
  disabled: false
})

const click = () => {
  if (!props.disabled) {
    emits('click')
  }
}
</script>

<style lang="scss">
@import 'styles';

.button-base {
  @apply text-sm flex items-center justify-between rounded-md p-2 border border-gray_light_1 border-solid;

  &__disabled {
    @apply cursor-not-allowed bg-gray_light_1;

    &:hover,
    &:active,
    &:focus {
      @apply cursor-not-allowed bg-gray_light_3;
    }
  }
}
</style>

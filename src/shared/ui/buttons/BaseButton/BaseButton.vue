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

const emit = defineEmits(['click'])

const attrs = useAttrs()

const props = withDefaults(defineProps<IButtonBase>(), {
  disabled: false
})

const click = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style lang="scss">
@import 'styles';
</style>

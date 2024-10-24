<template>
  <button
    v-bind="attrs"
    type="button"
    class="button-base"
    :class="[
      { 'button-base__disabled': disabled },
      { 'button-base__primary': primary },
      { 'button-base__solid': solid }
    ]"
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

interface IButton {
  primary?: boolean
  solid?: boolean
  disabled?: boolean
}

const emit = defineEmits(['click'])

const attrs = useAttrs()

const props = withDefaults(defineProps<IButton>(), {
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

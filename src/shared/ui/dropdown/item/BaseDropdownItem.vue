<template>
  <div v-bind="attrs" class="dropdown-elem" :class="{ 'dropdown-elem_divider': divider }">
    <slot name="icon"></slot>
    <span v-if="$slots.default" class="dropdown-elem__text">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

interface IBaseDropdownItem {
  divider?: boolean
}

const attrs = useAttrs()

withDefaults(defineProps<IBaseDropdownItem>(), {
  divider: false
})
</script>

<style lang="scss" scoped>
@import 'styles';
</style>

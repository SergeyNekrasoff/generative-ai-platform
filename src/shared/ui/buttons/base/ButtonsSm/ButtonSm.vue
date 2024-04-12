<template>
  <button class="button-sm row gap-xxs reset" type="button">
    <span class="button-sm__icon-wrap zero-line-h">
      <slot name="icon" />
    </span>

    <slot>
      <span v-if="text" class="button-sm__text">
        {{ text }}
      </span>
    </slot>
  </button>
</template>

<script setup lang="ts">
interface IButtonSm {
  text?: string
}

defineProps<IButtonSm>()
</script>

<style lang="scss">
@import 'styles';

.button-sm {
  align-self: baseline;
  color: var(gray);

  &__icon-wrap {
    color: inherit;
    transition-property: transform;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  &__text {
    transition-property: color;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  &:focus-visible,
  &:hover {
    color: var(red);
  }

  &:active {
    .button-sm__icon-wrap {
      transform: scale(0.9);
    }
  }
}
</style>

<template>
  <section>
    <h2 class="mb-s">Input</h2>

    <div class="column gap-s max-w-field">
      <BaseFormInput label="LABEL" name="input" placeholder="placeholder" />

      <BaseFormInput
        v-for="(item, i) of inputList"
        :key="i"
        class="events-none"
        :class="item"
        :label="item.toUpperCase()"
        :name="'input-' + (i + 1)"
        :placeholder="item"
        :is-disabled="item === 'disabled'"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { BaseFormInput } from '@/shared/ui/form'

const inputList = ['hover', 'focus', 'error', 'disabled']
</script>

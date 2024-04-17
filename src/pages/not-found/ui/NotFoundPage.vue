<template>
  <h2>{{ title }}</h2>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const title = computed((): string => '404 - page not found')
</script>

<template>
  <footer :app="true">
    <div>
      <div>
        <p>
          © {{ initYear }}
          <span v-if="currentYear > initYear"> - {{ currentYear }}</span>
          textailor.io
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const initYear = ref(2024)
const currentYear = ref(new Date().getFullYear())
</script>

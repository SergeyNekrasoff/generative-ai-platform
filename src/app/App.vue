<template>
  <component :is="layout">
    <template v-slot:header>
      <TheHeader />
    </template>

    <template v-slot:navigation>
      <Navigation />
    </template>

    <template v-slot:default>
      <router-view />
    </template>

    <template v-slot:footer>
      <Footer />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { TheHeader } from '@/widgets/header'
import { Navigation } from '@/widgets/navigation'
import { Footer } from '@/widgets/footer'
import { DefaultLayout } from '@/shared/ui/layouts'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<style lang="scss">
@import './styles/index.scss';
</style>

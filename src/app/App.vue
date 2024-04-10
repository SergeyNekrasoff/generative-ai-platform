<template>
  <component :is="layout">
    <template v-slot:header>
      <Header />
    </template>

    <template v-slot:navigation>
      <Navigation />
    </template>

    <template v-slot:default>
      <router-view />
    </template>

    <!-- <template v-slot:footer>
      <Footer />
    </template> -->

    <template v-slot:widgets>
      <ContainerModal />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Header } from '@/widgets/header'
import { Navigation } from '@/widgets/navigation'
// import { Footer } from '@/widgets/footer'
import { DefaultLayout } from '@/shared/ui/layouts'
import { ContainerModal } from '@/shared/ui/modal'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<style lang="scss">
.layout {
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-areas:
    'header header'
    'navigation content';

  header {
    grid-area: header;
  }

  nav {
    grid-area: navigation;
  }

  main {
    grid-area: content;
  }

  //footer {
  //  grid-area: footer;
  //}
}

@import './styles/index.scss';
</style>

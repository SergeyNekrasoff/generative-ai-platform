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

    <template v-slot:tools>
      <BaseModal />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Header } from '@/widgets/header'
import { Navigation } from '@/widgets/navigation'
import { Footer } from '@/widgets/footer'
import { DefaultLayout } from '@/shared/ui/layouts'
import { BaseModal } from '@/shared/ui/modal'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<style lang="scss">
.layout {
  display: grid;
  header {
    grid-area: header;
  }
  nav {
    grid-area: navigation;
  }
  main {
    grid-area: main;
  }
  //footer {
  //  grid-area: footer;
  //}
  grid-template-areas:
    'header header'
    'nav main';
}

@import './styles/index.scss';
</style>

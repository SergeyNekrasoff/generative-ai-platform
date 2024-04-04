<template>
  <section class="navigation">
    <div class="flex items-start justify-between">
      <ul class="navigation__list">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <hr />
        </li>
        <li>
          <router-link to="/projects">Projects</router-link>
        </li>
        <li>
          <router-link to="/templates">Templates</router-link>
        </li>
      </ul>
    </div>
    <div>Navigation</div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import 'styles';
</style>

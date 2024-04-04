<template>
  <div class="layout" ref="app">
    <slot name="header"></slot>
    <slot name="navigation"></slot>

    <main>
      <slot />
    </main>

    <slot name="footer"></slot>
  </div>
</template>

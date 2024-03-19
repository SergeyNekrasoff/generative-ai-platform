<template>
  <div class="rounded rounded-md" ref="app">
    <slot name="header"></slot>
    <slot name="navigation"></slot>

    <main>
      <slot />
    </main>

    <slot name="footer"></slot>
  </div>
</template>

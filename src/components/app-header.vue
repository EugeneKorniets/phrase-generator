<template>
  <header class="app-header">
    <slot/>
  </header>
</template>

<script>
  export default {
    name: 'app-header'
  }
</script>

<style lang="scss">
  .app-header {
    padding: 20px 0;
    color: white;
    background-color: #0a2b4e;
  }
</style>

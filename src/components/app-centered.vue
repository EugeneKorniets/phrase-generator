<template>
  <div class="app-centered">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'app-centered'
  }
</script>

<style>
  .app-centered {
    width: 96%;
    max-width: 1400px;
    margin: 0 auto;
  }
</style>

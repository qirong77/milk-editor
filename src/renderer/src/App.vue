<template>
  <div class="container">
    <side-bar />
    <editor/>
  </div>
</template>

<script setup lang="ts">
import Editor from './components/editor/index.vue'
import SideBar from './components/sidebar/index.vue'
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>

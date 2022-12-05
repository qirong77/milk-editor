<template>
  <div class="container">
    <header><span>title</span></header>
    <main>
      <side-bar />
      <editor />
    </main>
    <global/>
  </div>
</template>

<script setup lang="ts">
import Editor from './components/editor/index.vue'
import SideBar from './components/sidebar/index.vue'
import global from './components/global/index.vue';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  main {
    display: flex;
    flex: auto;
  }
  header {
    -webkit-app-region: drag;
    user-select: none;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <div class="container">
    <header><span></span></header>
    <main>
      <side-bar />
      <editor />
    </main>
    <global/>
    <footer>
      <ul>
        <li>focus:{{useStore().focusedPath}}</li>
        <li>openedFile {{useStore().openedFile}}</li>
        <li>{{useStore().showInput}}</li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Editor from './components/editor/index.vue'
import SideBar from './components/sidebar/index.vue'
import global from './components/global/index.vue';
import { useStore } from './store';

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
  footer {
    position: fixed;
    right: 50px;
  z-index: 99999999;
  background-color: dimgrey;
  }
}
</style>

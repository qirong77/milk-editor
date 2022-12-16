<template>
  <div class="container">
    <header>
      <span>
        {{basename(useStore().openedFile)}}
      </span>
    </header>
    <main>
      <side-bar :side-bar-width="sideBarWidth" @update:width="handleWidthChange"/>
      <editor :side-bar-width="sideBarWidth"/>
    </main>
    <global />
    <footer>
      <!-- <ul>
        <li>focus:{{useStore().focusedPath}}</li>
        <li>openedFile {{useStore().openedFile}}</li>
        <li>{{useStore().showInput}}</li>
      </ul> -->
    </footer>
  </div>
</template>

<script setup lang="ts">
import Editor from './components/editor/index.vue'
import SideBar from './components/sidebar/index.vue'
import global from './components/global/index.vue'
import { basename } from 'path-browserify'
import { useStore } from './store'
import { onMounted, ref } from 'vue'
import { GET_DIR_TREE } from '../../common/eventType'
const sideBarWidth = ref(200)
const handleWidthChange = (newWidth) =>{
  sideBarWidth.value = newWidth
}
onMounted(()=>{
  window.api.sendToMain(GET_DIR_TREE)
})
</script>

<style lang="scss">
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

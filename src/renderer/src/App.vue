<template>
  <div class="container">
    <header>
      <span>
        {{ basename(store.openedFile) }}
      </span>
    </header>
    <main>
      <side-bar :side-bar-width="sideBarWidth" @update:width="handleWidthChange" />
      <editor :side-bar-width="sideBarWidth" />
    </main>
    <search-file v-if="store.shortcuts.searchFile"/>
  </div>
</template>

<script setup lang="ts">
import Editor from './components/editor/index.vue'
import SearchFile from './components/global/search-file.vue'
import SideBar from './components/sidebar/index.vue'
import { basename } from 'path-browserify'
import { useStore } from './store'
import { onMounted, ref } from 'vue'
import { GET_DIR_TREE } from '../../common/eventType'
import { useShortCuts } from './common/useShortCuts'
const sideBarWidth = ref(200)
const store = useStore()
const handleWidthChange = (newWidth) => {
  sideBarWidth.value = newWidth
}
onMounted(() => {
  window.api.sendToMain(GET_DIR_TREE)
  useShortCuts()
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
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  footer {
    position: fixed;
    right: 50px;
    z-index: 99999999;
    background-color: dimgrey;
  }
}
</style>

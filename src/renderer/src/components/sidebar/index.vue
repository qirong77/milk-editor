<template>
  <div
    class="side-bar"
    :style="{
      width: sideBarWidth + 'px',
      minWidth: sideBarWidth + 'px'
    }"
  >
    <keep-alive>
      <component :is="tabs[currentTab]"></component>
    </keep-alive>
    <drag-line :width="sideBarWidth" @drag-done="handleDragDone" />
  </div>
</template>

<script setup lang="ts">
/// <reference path='../../../../preload/index.d.ts'/>
import { onMounted, ref } from 'vue'
import {
  DELETE,
  MENU_DELETE,
  MENU_NEW_FILE,
  MENU_RENAME_FILE,
  CREATE_NEW,
  MENU_NEW_DIR
} from '../../../../common/eventType'
import { useStore } from '../../store'
import DragLine from './components/drag-line/drag-line.vue'
import HeaderList from './components/header-list/index.vue'
import SearchWordGlobal from './components/search-word-global/index.vue'
import FileList from './components/file-list/index.vue'
const currentTab = ref<'HeaderList' | 'SearchWordGlobal' | 'FileList'>('FileList')
const tabs = {
  HeaderList,
  SearchWordGlobal,
  FileList
}
const store = useStore()
// 监听到右键点击菜单时间
window.api.onMain(MENU_RENAME_FILE, () => store.setShowInput(true))
window.api.onMain(MENU_DELETE, () => window.api.sendToMain(DELETE, store.focusedPath))
window.api.onMain(MENU_NEW_FILE, () => window.api.sendToMain(CREATE_NEW, store.focusedPath, false))
window.api.onMain(MENU_NEW_DIR, () => window.api.sendToMain(CREATE_NEW, store.focusedPath, true))
defineProps<{
  sideBarWidth: number
}>()
const emits = defineEmits(['update:width'])
const handleDragDone = (newWidth: number) => {
  emits('update:width', newWidth)
}
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'f' && e.shiftKey) {
      currentTab.value = 'SearchWordGlobal'
    }
    if (e.metaKey && e.key === 's' && e.shiftKey) {
      currentTab.value = 'FileList'
    }
    if (e.key === 'Tab') {
      currentTab.value = 'HeaderList'
    }
  })
})
</script>

<style lang="scss" scoped>
.side-bar {
  max-height: calc(100vh - 36px);
  overflow: scroll;
  position: relative;
}
</style>

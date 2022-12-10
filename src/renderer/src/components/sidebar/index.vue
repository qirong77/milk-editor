<template>
  <div
    class="side-bar"
    @contextmenu.stop="handleContext"
    :style="{
      width: sideBarWidth + 'px',
      minWidth: sideBarWidth + 'px'
    }"
  >
    <div class="file-list-container" ref="listRef">
      <file-list :tree="tree" />
    </div>

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
  UPDATE_DIR_TREE,
  CREATE_FILE,
  POP_FILE_DIR_MENU
} from '../../../../common/eventType'
import { DirTree } from '../../../../common/types'
import { useStore } from '../../store'
import DragLine from './components/drag-line/drag-line.vue'
import FileList from './components/file-list/file-list.vue'

const tree = ref<DirTree>()
const store = useStore()
window.api.onMain(UPDATE_DIR_TREE, (_e, newTree, paths, focusPath) => {
  console.log('📕get-dir-tree', newTree)
  store.setTotalPaths(paths)
  tree.value = newTree
  if (focusPath) {
    store.setFocusedPath(focusPath)
    store.setShowInput(true)
  }
})
// 监听到右键点击菜单时间
window.api.onMain(MENU_RENAME_FILE, () => store.setShowInput(true))
window.api.onMain(MENU_NEW_FILE, () => window.api.sendToMain(CREATE_FILE, store.focusedPath))
window.api.onMain(MENU_DELETE, () => window.api.sendToMain(DELETE, store.focusedPath))
const handleContext = () => {
  window.api.sendToMain(POP_FILE_DIR_MENU)
  store.setFocusedPath(tree.value?.path || '')
}
const sideBarWidth = ref(200)
const handleDragDone = (newWidth: number) => {
  sideBarWidth.value = newWidth
}
const listRef = ref<HTMLDivElement>()
onMounted(() => {
  document.addEventListener('click', (e: MouseEvent) => {
    if (!listRef.value?.contains((e.target as Node).parentElement)) {
      store.setFocusedPath('')
    }
  })
})
</script>

<style lang="scss" scoped>
.side-bar {
  overflow: scroll;
  position: relative;
}
</style>

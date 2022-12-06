<template>
  <div
    class="side-bar"
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
import { UPDATE_DIR_TREE } from '../../../../common/eventType'
import { DirTree } from '../../../../common/types'
import { useStore } from '../../store'
import DragLine from './components/drag-line/drag-line.vue'
import FileList from './components/file-list/file-list.vue'

const tree = ref<DirTree>()
const store = useStore()
window.api.onMain(UPDATE_DIR_TREE, (_e, newTree, paths) => {
  console.log('📕get-dir-tree', newTree)
  store.setTotalPaths(paths)
  tree.value = newTree
})
const sideBarWidth = ref(200)
const handleDragDone = (newWidth: number) => {
  sideBarWidth.value = newWidth
}
const listRef = ref<HTMLDivElement>()
onMounted(() => {
  // span无法触发的问题
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

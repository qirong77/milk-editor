<template>
  <div class="file-list-container" ref="listRef" @contextmenu.stop="handleContext">
    <h2>文 件</h2>
    <file-list :tree="tree" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  DELETE,
  MENU_DELETE,
  MENU_NEW_FILE,
  MENU_RENAME_FILE,
  CREATE_NEW,
  MENU_NEW_DIR,
  POP_FILE_DIR_MENU,
  UPDATE_DIR_TREE
} from '../../../../../../common/eventType'

import { DirTree } from '../../../../../../common/types'
import eventBus from '../../../../EventBus'
import { useStore } from '../../../../store'
import FileList from './components/file-list.vue'
const store = useStore()
// 监听到右键点击菜单事件
window.api.onMain(MENU_RENAME_FILE, () => store.setShowInput(true))
window.api.onMain(MENU_DELETE, () => window.api.sendToMain(DELETE, store.focusedPath))
window.api.onMain(MENU_NEW_FILE, () => {
  eventBus.emit('NEW_FILE', store.focusedPath)
  window.api.sendToMain(CREATE_NEW, store.focusedPath, false)
})
window.api.onMain(MENU_NEW_DIR, () => {
  eventBus.emit('NEW_FILE', store.focusedPath)
  window.api.sendToMain(CREATE_NEW, store.focusedPath, true)
})
const tree = ref<DirTree>()
window.api.onMain(UPDATE_DIR_TREE, (_e, newTree, paths, focusPath) => {
  console.log('📕get-dir-tree', newTree)
  store.setTotalPaths(paths)
  tree.value = newTree
  if (focusPath) {
    store.setFocusedPath(focusPath)
    store.setShowInput(true)
  }
})
// 根文件的右键
const handleContext = () => {
  store.setFocusedPath(tree.value?.path || '')
  window.api.sendToMain(POP_FILE_DIR_MENU)
}
// 判断是不是点击到外面
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
.file-list-container {
  height: 100%;
  h2 {
    display: flex;
    justify-content: center;
    font-weight: initial;
    margin: 14px 0px;
  }
}
</style>

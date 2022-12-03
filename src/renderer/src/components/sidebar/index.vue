<template>
  <div class="side-bar">
    <file-list :tree="tree" />
  </div>
</template>

<script setup lang="ts">
/// <reference path='../../../../preload/index.d.ts'/>
import { ref } from 'vue'
import { UPDATE_DIR_TREE } from '../../../../common/eventType'
import { DirTree } from '../../../../common/types'
import FileList from './components/file-list/file-list.vue'
const tree = ref<DirTree>()
window.api.onMain(UPDATE_DIR_TREE, (_e, newTree) => {
  console.log('📕get-dir-tree', newTree)
  tree.value = newTree
})
</script>

<style lang="scss" scoped>
.side-bar {
  width: 200px;
  height: 100vh;
  overflow: scroll;
}
</style>

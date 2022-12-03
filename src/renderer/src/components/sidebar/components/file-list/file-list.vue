<template>
  <ul
    class="file-list"
    :class="{
      'file-list-close': !isOpen
    }"
  >
    <file-item
      @toggle-file-list="toggleFileList"
      :file-name="tree.fileName"
      :is-dir="tree.isDir"
      :level="tree.level"
      :path="tree.path"
    />
    <template v-for="child in tree.children" :key="child.path">
      <file-list :tree="child" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { treeData, Tree } from './tree-data'
import FileItem from './file-item.vue'
const isOpen = ref(true)
const toggleFileList = () => {
  isOpen.value = !isOpen.value
}
defineProps({
  tree: {
    type: Object as PropType<Tree>,
    default: treeData
  }
})
</script>

<style lang="scss">
.file-list {
  height: auto;
}
ul.file-list-close {
  height: 30px;
  overflow: hidden;
}
</style>

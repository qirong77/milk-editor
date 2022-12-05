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
      :is-open="isOpen"
    />
    <template v-for="child in tree.children" :key="child.path">
      <file-list :tree="child" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { DirTree } from '../../../../../../common/types';
import FileItem from './file-item.vue'
const isOpen = ref(true)
const toggleFileList = () => {
  isOpen.value = !isOpen.value
}
defineProps({
  tree: {
    type: Object as PropType<DirTree>,
    default: {
      fileName: 'Markdowns',
      path: '/Users/qirong77/Desktop/front-end-book/Markdowns',
      level: 0,
      isDir: true,
      opened: false
    }
  }
})
</script>

<style lang="scss">
.file-list {
  height: auto;
  user-select: none;
}
ul.file-list-close {
  height: 30px;
  overflow: hidden;
}
</style>

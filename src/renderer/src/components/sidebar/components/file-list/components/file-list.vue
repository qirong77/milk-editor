<template>
  <ul
    class="file-list"
    :class="{
      'file-list-close': !isOpen,
      'on-drag': isOnDrag
    }"
    @dragover.prevent="allowDrop"
    @drop="handleDrop"
    @dragleave="handleDragLeave"
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
import { PropType, ref, watch } from 'vue'
import { DirTree } from '../../../../../../../common/types'
import FileItem from './file-item.vue'
import { DRAG_FILE } from '../../../../../../../common/eventType'
import { useStore } from '../../../../../store'
const store = useStore()
const props = defineProps({
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
const isOpen = ref(true)
const isOnDrag = ref(false)
const toggleFileList = () => {
  isOpen.value = !isOpen.value
}
const allowDrop = (e: DragEvent) => {
  if (props.tree.isDir) {
    e.stopPropagation()
    isOnDrag.value = true
  }
}
const handleDragLeave = () => {
  if (props.tree.isDir) {
    isOnDrag.value = false
  }
}
// 因为现在的逻辑是外面至少会有一个ul，而不是可能是只有一个li，所以需要判断需不需冒泡让上层监视到
const handleDrop = (e: DragEvent) => {
  if (props.tree.isDir) {
    e.stopPropagation()
    isOnDrag.value = false
    window.api.sendToMain(DRAG_FILE, e.dataTransfer?.getData('path'), props.tree.path)
  }
}
// 更改文件夹名称的时候，展开当前文件夹
watch(
  () => store.showInput,
  () => {
    if (store.showInput && props.tree.path.includes(store.focusedPath)) {
      isOpen.value = true
    }
  }
)
</script>

<style lang="scss">
.file-list {
  height: auto;
  user-select: none;
  padding: 0px;
}
ul.file-list-close {
  height: 30px;
  overflow: hidden;
}
ul.on-drag {
  background-color: #423c5c;
}
</style>

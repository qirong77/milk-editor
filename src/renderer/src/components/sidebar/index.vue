<template>
  <div
    class="side-bar"
    :style="{
      width: sideBarWidth + 'px',
      minWidth: sideBarWidth + 'px'
    }"
  >
    <keep-alive exclude="header-list">
      <component :is="tabs[currentTab]"></component>
    </keep-alive>
    <drag-line :width="sideBarWidth" @drag-done="handleDragDone" />
  </div>
</template>

<script setup lang="ts">
/// <reference path='../../../../preload/index.d.ts'/>
import { onMounted, ref, watch } from 'vue'
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
watch(currentTab, () => {
  store.setSearchInfo({ word: '' })
})

defineProps<{
  sideBarWidth: number
}>()
const emits = defineEmits(['update:width'])
const handleDragDone = (newWidth: number) => {
  emits('update:width', newWidth)
}
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    // 全局搜索的关键字
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
  max-height: calc(100vh - 26px);
  overflow: scroll;
  position: relative;
}
</style>

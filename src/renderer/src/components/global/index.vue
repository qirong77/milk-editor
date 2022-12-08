<template>
  <div>
    <search-file v-if="showSearchFile" @update-path="updatePath" @open-file="onOpenFile" />
    <search-word v-if="showSearchWord" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOpenFile } from '../../common/useOpenFile'
import { useStore } from '../../store'
import SearchFile from './search-file.vue'
import SearchWord from './search-word.vue'
const store = useStore()
const showSearchWord = ref(false)
const showSearchFile = ref(false)
const currentPath = ref('')
const updatePath = (path: string) => (currentPath.value = path)
const globalSearch = ref(false)
const onOpenFile = () => {
  useOpenFile(currentPath.value)
  showSearchFile.value = false
}
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.metaKey && e.key === 'f' && !e.shiftKey) {
    showSearchWord.value = !showSearchWord.value
    globalSearch.value = false
  }
  if (e.metaKey && e.key === 'f' && e.shiftKey) {
    showSearchWord.value = !showSearchWord.value
    globalSearch.value = true
  }
  if (e.metaKey && e.key === 'p') {
    showSearchFile.value = !showSearchFile.value
  }
  // 一个enter应该只处理一件事，后面需要考虑逻辑优化
  if (e.key === 'Enter') {
    if (showSearchFile.value) {
      onOpenFile()
      return
    }
    if (store.showInput) {
      store.setShowInput(false)
      return
    }
    if (store.focusedPath) {
      store.setShowInput(true)
      return
    }
  }
})
</script>

<style lang="scss" scoped></style>

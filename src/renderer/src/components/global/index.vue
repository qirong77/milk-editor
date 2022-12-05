<template>
  <div>
    <search-file v-if="showSearchFile" @update-path="updatePath" @open-file="openFile" />
    <search-word v-if="showSearchWord" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../../store'
import SearchFile from './search-file.vue'
import SearchWord from './search-word.vue'
const showSearchWord = ref(false)
const showSearchFile = ref(false)
const currentPath = ref('')
const updatePath = (path: string) => (currentPath.value = path)
const store = useStore()
const openFile = () => {
  store.changeOpenedPath(currentPath.value)
  showSearchFile.value = false
}
const globalSearch = ref(false)
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
  if (e.key === 'Enter' && showSearchFile.value) {
    openFile()
  }
})
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <search-file v-if="showSearchFile" @update-path="updatePath" @open-file="onOpenFile" />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DELETE } from '../../../../common/eventType'
import { useOpenFile } from '../../common/useOpenFile'
import { useStore } from '../../store'
import SearchFile from './search-file.vue'

const store = useStore()
const showSearchFile = ref(false)
const currentPath = ref('')
const updatePath = (path: string) => (currentPath.value = path)
const onOpenFile = () => {
  useOpenFile(currentPath.value)
  showSearchFile.value = false
}
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.metaKey && e.key === 'p') {
    showSearchFile.value = !showSearchFile.value
  }
  // 一个enter应该只处理一件事，后面需要考虑逻辑优化
  if (e.key === 'Enter') {
    if (showSearchFile.value) {
      onOpenFile()
      return
    }
    if (store.focusedPath) {
      store.setShowInput(true)
      return
    }
  }
  if(e.metaKey && e.key==='Backspace'){
    window.api.sendToMain(DELETE,store.focusedPath)
  }
})
</script>

<style lang="scss" scoped></style>

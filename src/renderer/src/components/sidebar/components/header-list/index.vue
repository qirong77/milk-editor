<template>
  <div class="header-list">
      <template v-for="tree in trees">
        <header-list :tree="tree" />
      </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderList from './components/header-list.vue'
import { getHeaderTree } from './helper/getHeaderTree'

const getTree = () => {
  const hs = Array.from(
    document.querySelector('.milkdown .editor')?.querySelectorAll('h1,h2,h3,h4,h5,h6') || []
  )
  return getHeaderTree(hs as HTMLElement[])
}
const trees = ref(getTree())
setInterval(() => {
  trees.value = getTree()
  console.log('📕', trees.value[0])
}, 1000)
</script>

<style lang="scss" scoped></style>

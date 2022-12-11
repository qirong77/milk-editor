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

const hs = document.querySelector('.milkdown .editor')?.querySelectorAll('h1,h2,h3,h4,h5,h6') || []
const trees = ref(getHeaderTree(Array.from(hs) as HTMLElement[]))
</script>

<style lang="scss" scoped></style>

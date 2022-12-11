<template>
  <ul>
    <header-item :header="tree" />
    <template v-for="child in tree.children" :key="child.header">
      <header-list :tree="child" />
    </template>
  </ul>
</template>

<script setup lang="ts">

import { HeaderTree } from '../helper/getHeaderTree'
import HeaderItem from './header-item.vue'
defineProps<{
  tree:HeaderTree
}>()
</script>

<style lang="scss" scoped></style>

<template>
  <div class="header-list">
    <h1>outline</h1>
    <template v-for="tree in trees">
      <header-list :tree="tree" />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { UPDATE_HEADERS } from '../../../../../../common/eventType'
defineComponent({
  name: 'header-list'
})
</script>
<script setup lang="ts">
import { ref, } from 'vue'
import HeaderList from './components/header-list.vue'
import { getHeaderTree } from './helper/getHeaderTree'
const getTree = () => {
  const hs = Array.from(
    document.querySelector('.milkdown .editor')?.querySelectorAll('h1,h2,h3,h4,h5,h6') || []
  )
  return getHeaderTree(hs as HTMLElement[])
}
const trees = ref(getTree())
window.api.onMain(UPDATE_HEADERS,()=> {
  trees.value = getTree()
})

</script>

<style lang="scss" scoped>
h1 {
  height: 80px;
  line-height: 80px;
  font-weight: 400;
  text-align: center;
}
.header-list {
  user-select: none;
}
</style>

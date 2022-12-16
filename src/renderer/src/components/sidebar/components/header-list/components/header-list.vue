<template>
  <ul
    :class="{
      close: isClose
    }"
  >
    <li
      :style="{
        paddingLeft: margin * 8 + 2 + 'px'
      }"
      @click.stop="handleClick"
    >
      <svg
        v-if="tree.children.length"
        class="triangle-down"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <span>
        {{ tree.header.innerText }}
      </span>
    </li>
    <template v-for="child in tree.children" :key="child.header">
      <header-list :tree="child" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HeaderTree } from '../helper/getHeaderTree'
const props = defineProps<{
  tree: HeaderTree
}>()
const margin = Number(props.tree.tagName[1])
const isClose = ref(false)
const handleClick = () => {
  isClose.value = !isClose.value
  props.tree.header.scrollIntoView()
}
</script>

<style lang="scss" scoped>
ul li {
  display: flex;
  align-items: center;
  min-height: 30px;
  cursor: pointer;
  svg {
    margin-right: 6px;
    transform: rotateZ(0deg);
    transition: all 0.3s;
  }
  &:hover {
    background-color: rgb(56, 62, 77);
  }
}
ul.close {
  height: 30px;
  overflow: hidden;
  svg {
    transform: rotateZ(-90deg);
  }
}
</style>

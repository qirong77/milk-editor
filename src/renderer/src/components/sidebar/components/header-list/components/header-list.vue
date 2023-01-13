<template>
  <ul
    :class="{
      close: isClose
    }"
  >
    <li
      :style="{
        paddingLeft: computedLeft + 'px'
      }"
      @click.stop="isClose = !isClose"
    >
      <div
        class="svg-container"
        v-if="showSvg"
        :style="{
          width: iconSize + 'px',
          height: iconSize + 'px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }"
      >
        <svg
          class="triangle-down"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>

      <span @click.stop="tree.header.scrollIntoView(true)">
        {{ tree.header.innerText }}
      </span>
    </li>
    <template v-for="child in tree.children" :key="child.header">
      <header-list :tree="child" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { HeaderTree } from '../helper/getHeaderTree'
const props = defineProps<{
  tree: HeaderTree
}>()
const iconSize = 20
const showSvg = computed(() => props.tree.children.length)
const computedLeft = computed(() => {
  const level = Number(props.tree.tagName[1])
  const basic = level * iconSize
  return showSvg ? basic : basic + iconSize
})
const isClose = ref(false)
</script>

<style lang="scss" scoped>
ul li {
  display: flex;
  align-items: center;
  min-height: 30px;
  div {
    border-radius: 4px;
    svg {
      cursor: pointer;
      transform: rotateZ(0deg);
      transition: all 0.3s;
    }
  }

  span {
    cursor: pointer;
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

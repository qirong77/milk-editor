<template>
  <li
    class="h"
    :style="{
      paddingLeft: Number(level) * 5 + 'px'
    }"
    @click.stop="handleClick"
  >
    <div v-if="hasChildren">
      <svg
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
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { HeaderTree } from '../helper/getHeaderTree'
const props = defineProps({
  Header: {
    type: Object as PropType<HeaderTree>,
    default: {}
  }
})
const hasChildren = computed(() => (props.Header?.children.length > 0 ? true : false))
const handleClick = () => {
  props.Header.header.scrollIntoView()
}
const level = computed(() => props.Header.tagName[1])
</script>

<style lang="scss" scoped>
.h {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <ul
    :style="{
      height: isClose ? '30px' : 'auto'
    }"
  >
    <li class="fileName" @click.stop="handleClick">
      <svg
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
      {{ file.fileName }}
    </li>
    <li v-for="match in file.matchs" :key="match.index">
      <p v-html="match.line"></p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchWords } from '../../../../../../common/types'
import { useStore } from '../../../../store'
const props = defineProps<{
  file: SearchWords
}>()
const isClose = ref(false)
const handleClick = () => {
  useStore().changeOpenedPath(props.file.path)
  isClose.value = !isClose.value
}
</script>

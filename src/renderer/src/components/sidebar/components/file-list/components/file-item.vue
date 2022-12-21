<template>
  <li
    class="file-item"
    :class="{ 'file-item-active': isActive, input: showInput, 'file-item-focus': isFocused }"
    @click="handleClick"
    @contextmenu.stop="handleContext"
    @mouseleave=""
    :style="{
      paddingLeft: 4 + level * 12 + 'px',
      display: level === 0 ? 'none' : 'flex'
    }"
    draggable="true"
    @dragstart="handleDragStart"
  >
    <!-- 只有作为文件名的item有图标 -->
    <div v-if="isDir && !showInput">
      <svg
        class="triangle-down"
        :class="{ rotate: !isOpen }"
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
      <svg
        v-if="isOpen"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"
        />
      </svg>
    </div>
    <input
      v-if="showInput"
      type="text"
      @blur="handleBlur"
      @keydown.stop="handleConfirm"
      ref="input"
      v-model="iptValue"
    />
    <template v-else> {{ iptValue }}</template>
  </li>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import {
  GET_DIR_TREE,
  POP_FILE_ITEM_MENU,
  RENAME_FILE,
  POP_FILE_DIR_MENU
} from '../../../../../../../common/eventType'
import { useStore } from '../../../../../store'
const props = defineProps<{
  fileName: string
  isDir: boolean
  path: string
  level: number
  isOpen: boolean
}>()
const store = useStore()
const emits = defineEmits(['toggle-file-list'])
const showInput = computed(() => store.focusedPath === props.path && store.showInput)
const rotateSvg = ref(true)
const isActive = computed(() => store.openedFile === props.path)
const isFocused = computed(() => store.focusedPath === props.path)
const handleContext = () => {
  store.setFocusedPath(props.path)
  if (!props.isDir) window.api.sendToMain(POP_FILE_ITEM_MENU)
  else window.api.sendToMain(POP_FILE_DIR_MENU)
}
const iptValue = ref(props.fileName)
const handleBlur = () => {
  store.setShowInput(false)
}
const handleConfirm = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    store.setShowInput(false)
    if (iptValue.value !== props.fileName) {
      window.api.sendToMain(RENAME_FILE, props.path, iptValue.value)
      window.api.sendToMain(GET_DIR_TREE)
    }
  }
}
// input-focus
watch(
  () => store.showInput,
  () => {
    nextTick(() => {
      if (store.focusedPath === props.path) {
        const input = document.querySelector('.input')?.querySelector('input')
        input?.focus()
      }
    })
  },
  {
    immediate: true
  }
)
const handleClick = () => {
  rotateSvg.value = !rotateSvg.value
  store.setFocusedPath(props.path)
  if (props.isDir) {
    props.isDir && emits('toggle-file-list')
  } else {
    store.changeOpenedPath(props.path)
  }
}
const handleDragStart = (e) => {
  e.dataTransfer.setData('path', props.path)
}
</script>

<style lang="scss">
li.file-item {
  display: flex;
  align-items: center;
  min-height: 30px;
  // 避免标题太长重叠
  height: auto;
  line-height: 30px;
  input {
    height: 30px;
    width: 90%;
  }
  &:hover {
    cursor: pointer;
    background-color: rgb(56, 62, 77);
  }
  div {
    display: flex;
    align-items: center;
    margin-right: 4px;
    svg {
      height: 16px;
      width: 16px;
      transition: all 0.5s;
    }
    svg.triangle-down {
      height: 12px;
      width: 12px;
      margin-right: 4px;
      transition: all 0.5s;
    }
    svg.rotate {
      transform: rotate(-90deg);
    }
  }
}
</style>

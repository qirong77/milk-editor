<template>
  <div class="search-word" :style="{
    top:position.y + 'px',
    left:position.x + 'px'
  }">
    <header @mousedown="handleMouseDown">
      查找
      <svg
        @click="emits('close')"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </header>
    <div class="input-container">
      <input v-model="word" ref="iptRef" type="text" @keydown="handleKeyDown" />
      <span>{{ currentIndex }}/{{ matchNodes.length-1 < 0? 0 : matchNodes.length}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import debounce from 'debounce'
const word = ref('')
const emits = defineEmits(['search-change', 'close'])
watch(
  word,
  debounce(() => {
    emits('search-change', word.value)
    nextTick(() => {
      const matchs = [...document.querySelectorAll('del')] || []
      matchNodes.value = matchs
    })
  }, 500)
)
const position = reactive({
  x:100,
  y:100
})
const handleMouseDown = (e:MouseEvent) => {
  const offsetX = e.offsetX
  const offsetY = e.offsetY
  // clietX就是距离浏览器视口的位置
  document.onmousemove = (e) => {
    position.x  = e.clientX - offsetX
    position.y = e.clientY - offsetY
    return false
  }
  // 释放鼠标的时候解除事件绑定
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    return false
  }
}
const matchNodes = ref([] as HTMLElement[])
const currentIndex = ref(0)
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    if (currentIndex.value >= matchNodes.value.length) currentIndex.value = 0
    else currentIndex.value++
    matchNodes.value[currentIndex.value]?.scrollIntoView()
  }
}
watch(matchNodes, () => {})
const iptRef = ref<HTMLInputElement>()
onMounted(() => {
  iptRef.value?.focus()
  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'f' && !e.shiftKey) {
      iptRef.value?.focus()
    }
  })
})
</script>

<style lang="scss" scoped>
.search-word {
  height: 100px;
  width: 300px;
  border-radius: 10px;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 9;
  border-radius: 8px;
  header {
    -webkit-app-region: none;
    border-radius: 8px 8px 0px 0px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    svg {
      height: 30px;
      width: 30px;
    }
  }
  .input-container {
    flex: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    input {
      height: 30px;
      min-width: 160px;
      padding-left: 6px;
      font-size: 16px;
      border-radius: 6px;
      &:hover {
        cursor: text;
      }
    }
  }
}
</style>

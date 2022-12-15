<template>
  <div class="search-word">
    <span>{{ currentIndex }}</span>
    <input v-model="word" ref="iptRef" type="text" @keydown="handleKeyDown" />
    <button @click="emits('close')">close</button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
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
const matchNodes = ref([] as HTMLElement[])
const currentIndex = ref(0)
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    if (currentIndex.value >= matchNodes.value.length) currentIndex.value = 0
    else currentIndex.value++
    matchNodes.value[currentIndex.value]?.scrollIntoView()
  }
}
watch(matchNodes, () => {

})
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
  height: 40px;
  display: flex;
  border-radius: 10px;
  position: absolute;
  z-index: 9;
  top: 120px;
  left: 60vw;
  display: block;
  input {
    height: 100%;
    min-width: 160px;
    padding-left: 12px;
    font-size: 16px;
    border-radius: 6px;
    transform: scale(1);
    &:hover {
      cursor: text;
    }
  }
}
</style>

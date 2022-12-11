<template>
  <div class="search-word"><input v-model="word" type="text" /> <button @click="emits('close')">close</button></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import debounce from 'debounce'
const word = ref('')
const emits = defineEmits(['search-change','close'])
watch(
    word,
    debounce(() => {
        emits('search-change', word.value)
    }, 500)
    )

</script>

<style lang="scss" scoped>
.search-word {
  height: 40px;
  width: 200px;
  border-radius: 10px;
  position: absolute;
  z-index: 9;
  top: 120px;
  left: 60vw;
  display: block;
  input {
    height: 100%;
    width: 100%;
    padding-left: 12px;
    font-size: 16px;
    border-radius: 6px;
    &:hover {
      cursor: text;
    }
  }
}
</style>

<template>
  <div class="search-word-global">
    <div className="input-container">
      <input type="text" v-model="keyWord" ref="iptRef" />
      <div class="fn">
        <div
          class="case"
          :style="{
            backgroundColor: isCase ? 'rgb(65, 98, 118)' : '',
            marginRight: '6px'
          }"
          @click.stop="isCase = !isCase"
        >
          <span>Aa</span>
        </div>
        <div
          class="blank"
          @click.stop="isSideBlank = !isSideBlank"
          :style="{
            backgroundColor: isSideBlank ? 'rgb(65, 98, 118)' : ''
          }"
        >
          ab
        </div>
      </div>
    </div>
    <div class="tip">在 {{ totalPaths }} 个文件中有 {{ totalMatchs }} 个结果</div>
    <div class="search-results">
      <template v-for="file in results" :key="file.path">
        <search-item :file="file" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { SearchWords } from '../../../../../../common/types'
import { GET_SEARCH_RESULT } from '../../../../../../common/eventType'
import SearchItem from './search-item.vue'
import { useStore } from '../../../../store'
import eventBus from '../../../../EventBus'
const store = useStore()
const iptRef = ref<HTMLInputElement>()
const keyWord = ref('')
const results = ref<SearchWords[]>([
  {
    fileName: '未找到结果',
    path: '',
    matchs: [
      {
        line: 'not-found',
        index: 0
      }
    ]
  }
])
const totalMatchs = ref(0)
const totalPaths = ref(0)
const isCase = ref(false)
// 匹配的字符是否两边为空
const isSideBlank = ref(false)
const updateSearchResult = () => {
  window.api
    .interProcess(GET_SEARCH_RESULT, keyWord.value, isCase.value, isSideBlank.value)
    .then((response) => {
      results.value = response
      totalPaths.value = response.length
      totalMatchs.value = response.reduce((pre, file) => {
        return pre + file.matchs.length
      }, 0)
    })
}
watch(keyWord, () => {
  store.setSearchInfo({ word: keyWord.value })
  updateSearchResult()
})
watchEffect(() => {
  store.setSearchInfo({
    isCase: isCase.value,
    isBlank: isSideBlank.value
  })
  updateSearchResult()
})
eventBus.on('INPUT_FOCUS_G', () => {
  nextTick(() => {
    iptRef.value?.focus()
  })
})
onMounted(() => {
  iptRef.value?.focus()
})
</script>

<style lang="scss" scoped>
.search-word-global {
  position: absolute;
  z-index: 100;
  overflow: scroll;
  height: 100%;
  width: 100%;
  padding: 10px 0;
  top: 0;
  .input-container {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    input {
      width: 80%;
      height: 100%;
    }
    div.fn {
      position: absolute;
      right: 10%;
      display: flex;
      div {
        height: 24px;
        width: 24px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  svg {
    transition: all 0.5s;
  }
  svg.open {
    transform: rotateZ(-90deg);
  }
  div.tip {
    margin: 8px;
  }
}
</style>

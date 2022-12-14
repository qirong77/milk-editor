<template>
  <div class="search-word-global">
    <div className="input-container">
      <input type="text" v-model="keyWord" ref="iptRef" />
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
import { onMounted, ref, watch } from 'vue'
import debouce from 'debounce'
import { SearchWords } from '../../../../../../common/types'
import { GET_SEARCH_RESULT } from '../../../../../../common/eventType'
import SearchItem from './search-item.vue'
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

watch(
  keyWord,
  debouce(() => {
    window.api.interProcess(GET_SEARCH_RESULT, keyWord.value).then((response) => {
      console.log('📕', response)
      results.value = response
    })
  }, 800)
)
onMounted(() => {
  iptRef.value?.focus()
  // 重复按键就聚焦
  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'f' && e.shiftKey) {
      iptRef.value?.focus()
    }
  })
})
</script>

<style lang="scss">
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
    height: 25px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  svg {
    transition: all 0.5s;
  }
  svg.open {
    transform: rotateZ(-90deg);
  }
  .search-results {
    ul {
      overflow: hidden;
      li.fileName {
        svg {
          margin-right: 10px;
        }
      }
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        min-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 20px;
        &:hover {
          cursor: pointer;
          background-color: rgb(56, 62, 77);
        }
      }
    }
  }
}
</style>

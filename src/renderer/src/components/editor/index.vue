<template>
  <div
    class="editor-component"
    :class="{
      toobar: showToolBar
    }"
    :style="{
      'max-width': `calc(100vw - ${sideBarWidth}px)`
    }"
  >
    <search-word @search-change="search" v-if="showSearchWord" @close="closeSearch" />
    <VueEditor :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { Editor } from '@milkdown/core'
import { VueEditor, useEditor } from '@milkdown/vue'
import { onMounted, ref, watch } from 'vue'
import { useStore } from '../../store'
import { useConfig } from './config/useConfig'
import { usePlugins } from './config/usePlugins'
import { GET_FILE_CONTENT, SAVE_FILE } from '../../../../common/eventType'
import { replaceAll } from '@milkdown/utils'
import SearchWord from './component/search-word.vue'
defineProps<{
  sideBarWidth: number
}>()
const store = useStore()
const { editor, getInstance } = useEditor((root) => {
  const intance = Editor.make()
  useConfig(intance, root, (newMarkdown) => (markDown.value = newMarkdown))
  usePlugins(intance)
  return intance
})

const markDown = ref('')
// 因为milkdown的更新机制，有一个标志来判断
const flag = ref(false)
watch(markDown, () => {
  if (flag.value) {
    window.api.sendToMain(SAVE_FILE, store.openedFile, markDown.value.replaceAll('~~', ''))
  }
  flag.value = true
})
// 打开文件
watch(
  () => store.openedFile,
  () => {
    window.api.interProcess(GET_FILE_CONTENT, store.openedFile).then((res) => {
      console.log('get-new-content', res)
      markDown.value = res
      getInstance()?.action(replaceAll(res))
      flag.value = false
    })
  }
)
const showSearchWord = ref(false)
const closeSearch = () => {
  showSearchWord.value = false
  getInstance()?.action(replaceAll(markDown.value.replaceAll('~~', '')))
}
const search = (word) => {
  const matchRegex = new RegExp(word, 'gi')

  // 清空内容
  // \~是如果出现连续匹配，解析出错，比如你要匹配a字符，但是内容中有aa
  const cleanRegex = /\\~|~~/g
  const remains = []
  const cleanContent = markDown.value.replaceAll(cleanRegex, '')
  getInstance()?.action(replaceAll(cleanContent))
  const matchs = markDown.value.match(matchRegex)
  if (matchs && word) {
    const newContent = matchs.reduce((pre, word, index) => {
      const unique = pre.slice(index - 2, index + word.length + 2)
      console.log('📕',unique)
      return pre.replace(unique, `~~${unique}~~`)
    }, markDown.value)
    console.log('📕',newContent)
    // getInstance()?.action(replaceAll(newContent))
  }
}
const showToolBar = ref(false)

document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.metaKey && e.key === 'f' && !e.shiftKey) {
    showSearchWord.value = true
  }
  if (e.metaKey && e.key === 'm') {
    showToolBar.value = !showToolBar.value
  }
})
onMounted(() => {})
</script>

<style lang="scss">
.editor-component {
  flex: auto;
  .milkdown-menu {
    display: none;
  }
  .milkdown {
    overflow: scroll;
    max-height: calc(100vh - 36px);
    .editor {
      padding: 50px 40px;
      min-height: 90vh;
      del.strike-through {
        text-decoration: none;
        color: rgb(195, 239, 19);
        border: 1px solid rgb(195, 239, 19);
        border-radius: 20%;
        padding: 4px;
      }
    }
    div.list-item_label {
      font-size: 20px;
      line-height: 28px;
      color: rgb(92, 138, 195);
      margin-right: 4px;
    }
    // 无序列表
    .list-item[data-list-type='bullet'] > .list-item_label {
      font-size: 30px;
      margin-right: 0px;
    }
  }
  .milkdown-menu {
    position: absolute;
    z-index: 999;
  }
  // 清除默认编辑器我不喜欢的样式
  // this file amis to clear some default styles of the milkdown editor
  .editor .code-fence {
    position: relative;
    // 代码块的语言框大小
    div.code-fence_selector {
      width: 90px;
      height: 30px;
      opacity: 0%;
    }
    &:hover {
      div.code-fence_selector {
        opacity: 100%;
      }
    }
  }
  div.milkdown div.editor p {
    font-size: 18px;
  }
  div.milkdown .editor .code-fence pre {
    font-size: 15px;
  }
  div.milkdown .editor .heading {
    margin: 20px 0;
  }
  .code-fence_selector-wrapper {
    position: absolute !important;
    right: 0;
    bottom: -12px;
  }
  .code-fence_selector-wrapper .code-fence_selector span:nth-child(2) {
    display: none !important;
  }
  // 工具输入框？
  .milkdown-sj2pad {
    display: none !important;
  }

  .milkdown::-webkit-scrollbar {
    width: 0 !important;
  }
  .milkdown .editor h1.heading {
    font-weight: 500;
  }
  .milkdown .editor h3.heading {
    font-weight: 400;
    font-size: 30px;
  }
  .milkdown .editor h4.heading {
    font-weight: 400;
    font-size: 25px;
  }
  .milkdown .editor h5.heading {
    font-weight: 300;
    font-size: 20px;
  }
}
.toobar {
  .milkdown-menu {
    display: flex;
  }
}
</style>

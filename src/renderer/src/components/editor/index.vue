<template>
  <div
    class="editor-component"
    :class="{
      toobar: store.shortcuts.toolBar
    }"
    :style="{
      'max-width': `calc(100vw - ${sideBarWidth}px)`
    }"
  >
    <search-word @search-change="replaceSearch" v-show="store.shortcuts.searchWord" />
    <VueEditor :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { Editor } from '@milkdown/core'
import { VueEditor, useEditor } from '@milkdown/vue'
import { ref, watch, watchEffect } from 'vue'
import { useStore } from '../../store'
import { useConfig } from './config/useConfig'
import { usePlugins } from './config/usePlugins'
import { GET_FILE_CONTENT, NOTIFY_UPDATE_HEADERS, SAVE_FILE } from '../../../../common/eventType'
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
// 因为milkdown的更新机制，需有一个标志来判断
const flag = ref(false)
watch(markDown, () => {
  if (flag.value) {
    window.api.sendToMain(SAVE_FILE, store.openedFile, markDown.value.replaceAll('~~', ''))
  }
  flag.value = true
})
// 打开文件
const onOpenFile = () => {
  window.api
    .interProcess(GET_FILE_CONTENT, store.openedFile)
    .then((res) => {
      markDown.value = res
      getInstance()?.action(replaceAll(res))
      flag.value = false
    })
    .then(() => {
      // 更新标题列表
      window.api.sendToMain(NOTIFY_UPDATE_HEADERS)
    })
    .then(() => {
      if (store.searchInfo.word) {
        replaceSearch(store.searchInfo.word)
        jumpToWord(store.searchInfo.index)
      }
    })
}
// 全局搜索跳转到某个具体的位置
const jumpToWord = (index = 0) => {
  const nodes = [...document.querySelectorAll('del')] || []
  nodes[index]?.scrollIntoView(true)
}
watch(() => store.openedFile, onOpenFile)
// 点击左侧的全局搜索的相关字段
watch(
  () => store.searchInfo,
  () => {
    if (!store.searchInfo.word) return
    replaceSearch(store.searchInfo.word)
    jumpToWord(store.searchInfo.index)
  }
)
watchEffect(() => {
  console.log('📕', 'watchEffect')
  // if (!store.shortcuts.searchWord && !store.shortcuts.searchWordGlobal) {
  //   const cleanRegex = /\\~|~~/g
  //   const cleanContent = markDown.value.replaceAll(cleanRegex, '')
  //   getInstance()?.action(replaceAll(cleanContent))
  // }
})
// 处理大小写匹配是个麻烦事，暂时先模糊匹配
const replaceSearch = (word, isCase = false, isBlank = false) => {
  console.log('📕', '替换字段')
  const matchRegex = new RegExp(isBlank ? `\\s${word}\\s` : word, isCase ? 'g' : 'gi')
  // 清空内容
  // \~是如果出现连续匹配，解析出错，比如你要匹配a字符，但是内容中有aa
  const cleanRegex = /\\~|~~/g
  const cleanContent = markDown.value.replaceAll(cleanRegex, '')
  const matchs = cleanContent.match(matchRegex)
  const newContent =
    matchs && word
      ? cleanContent.replaceAll(matchRegex, `~~${isBlank ? ' ' + word + ' ' : word}~~`)
      : cleanContent
  getInstance()?.action(replaceAll(newContent))
}
</script>

<style lang="scss">
.editor-component {
  flex: auto;
  .milkdown-menu {
    display: none;
  }
  .milkdown {
    overflow: scroll;
    height: calc(100vh - 26px);
    .editor {
      padding: 50px 40px;
      min-height: 90vh;
      del.strike-through {
        text-decoration: none;
        border-radius: 4px;
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
      font-size: 30px !important;
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
    font-size: 42px;
  }
  .milkdown .editor h2.heading {
    font-size: 37px;
  }
  .milkdown .editor h3.heading {
    font-size: 32px;
  }
  .milkdown .editor h4.heading {
    font-size: 27px;
  }
  .milkdown .editor h5.heading {
    font-size: 22px;
  }
}
.toobar {
  .milkdown-menu {
    display: flex;
  }
}
</style>

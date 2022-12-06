<template>
  <div class="editor-component">
    <VueEditor :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { Editor } from '@milkdown/core'
import { VueEditor, useEditor } from '@milkdown/vue'
import { onMounted, ref, watch, watchEffect, WatchStopHandle } from 'vue'
import { useStore } from '../../store'
import { useConfig } from './config/useConfig'
import { usePlugins } from './config/usePlugins'
import { GET_FILE_CONTENT, SAVE_FILE } from '../../../../common/eventType'
import { replaceAll } from '@milkdown/utils'

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
    console.log('📕', 'SAVE_FILE')
    window.api.sendToMain(SAVE_FILE, store.openedFile, markDown.value)
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

onMounted(() => {})
</script>

<style lang="scss">
.editor-component {
  flex: auto;
  .milkdown {
    overflow: scroll;
    max-height: calc(100vh - 36px);
    .editor {
      padding: 50px 40px;
      min-height: 90vh;
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
</style>

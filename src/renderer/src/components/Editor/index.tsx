import React, { useEffect } from 'react'
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { ReactEditor, useEditor } from '@milkdown/react'
// 通用markdown预设
import { blockquote} from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'
import { useConfig } from './hooks/useConfig'
import { listener } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { menu } from '@milkdown/plugin-menu'
import { themeManagerCtx } from '@milkdown/core'
import { clipboard } from '@milkdown/plugin-clipboard'
import { replaceAll } from '@milkdown/utils'
import { gfm, SupportedKeys, codeFence, taskListItem } from '@milkdown/preset-gfm'

// 亮色主题
// import { nordLight } from '@milkdown/theme-nord'
// 暗色主题
import { nordDark } from '@milkdown/theme-nord'
// 官方引用的图标库，如菜单栏需要使用到
import '@material-design-icons/font'
// 数学公式渲染
import 'katex/dist/katex.min.css'
// 代码高亮
import 'prism-themes/themes/prism-material-oceanic.min.css'
interface MilkdownEditor {
  content: string
}

export const MilkdownEditor: React.FC<MilkdownEditor> = ({ content }) => {
  const gitHubCommonMark = gfm
    .configure(blockquote, {
      keymap: {
        [SupportedKeys.Blockquote]: 'Mod-Shift-q'
      }
    })
    .configure(taskListItem, {})
    .configure(codeFence, {
      languageList: ['scss', 'javascript', 'css', 'html', 'typescript']
    })
  const { editor, loading, getInstance } = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root), ctx.set(defaultValueCtx, content)
        useConfig(ctx)
      })
      .use(nord)
      .use(history)
      .use(listener)
      .use(prism)
      .use(menu)
      .use(clipboard)
      .use(gitHubCommonMark)
  )

  // 右键菜单
  useEffect(() => {
    const handleRightClick = () => {
      console.log('right-click')
    }
    const editor = document.querySelector('.milkdown')
    editor?.addEventListener('contextmenu', handleRightClick)
    return editor?.removeEventListener('contextmenu', handleRightClick)
  })
  // 更新内容
  useEffect(() => {
    if (!loading) {
      const instance = getInstance()
      instance?.action(replaceAll(content))
      instance?.action((ctx) => {
        ctx.get(themeManagerCtx).switch(ctx, nordDark)
      })
    }
  }, [loading, content])
  return <ReactEditor editor={editor} />
}

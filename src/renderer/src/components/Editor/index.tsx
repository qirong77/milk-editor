import React, { useEffect, useRef, useState } from 'react'
import { Ctx, defaultValueCtx, Editor, editorViewCtx, parserCtx, rootCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { EditorRef, ReactEditor, useEditor } from '@milkdown/react'
// 通用markdown预设
import { commonmark } from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'
import { useConfig } from './hooks/useConfig'
import { listener } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { menu } from '@milkdown/plugin-menu'
import { themeManagerCtx } from '@milkdown/core'
import { clipboard } from '@milkdown/plugin-clipboard'
import { replaceAll } from '@milkdown/utils'
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
interface MilkdownEditor {}

export const MilkdownEditor: React.FC<MilkdownEditor> = () => {
  const [content, setContent] = useState('')
  const { editor, getInstance } = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root), ctx.set(defaultValueCtx, content)
        useConfig(ctx)
      })
      .use(nord)
      .use(commonmark)
      .use(history)
      .use(listener)
      .use(prism)
      .use(menu)
      .use(clipboard)
  )
  const instance = getInstance()
  instance?.action((ctx) => {
    ctx.get(themeManagerCtx).switch(ctx, nordDark)
  })
  // 右键菜单
  useEffect(() => {
    const handleRightClick = () => {
      console.log('right-click')
    }
    const editor = document.querySelector('.milkdown')
    editor?.addEventListener('contextmenu', handleRightClick)
    return editor?.removeEventListener('contextmenu', handleRightClick)
  })
  useEffect(() => {
    window.api.onUpdateEditor((e, { content }) => {
      setContent(content)
    })
  }, [])
  // 更新内容
  useEffect(() => {
    instance?.action(replaceAll(content))
  }, [content])
  return <ReactEditor editor={editor} />
}

import React, { useEffect, useState } from 'react'
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { ReactEditor, useEditor } from '@milkdown/react'
// 通用markdown预设
import { commonmark } from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'

import { listenerCtx, listener } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { menu } from '@milkdown/plugin-menu'
import { themeManagerCtx } from '@milkdown/core'
// 亮色主题
import { nordLight } from '@milkdown/theme-nord'
// 暗色主题
import { nordDark } from '@milkdown/theme-nord'
// 官方引用的图标库，如菜单栏需要使用到
import '@material-design-icons/font'
// 数学公式渲染
import 'katex/dist/katex.min.css'
// 代码高亮
import 'prism-themes/themes/prism-material-oceanic.min.css'
interface MilkdownEditor {}
const DEFAULT_MARKDOWN = `# H1
## H2
### H3
#### H4
###### H5`
window.api.onUpdateEditor((e,value)=>{
  console.log(e)
  console.log(value)
})
export const MilkdownEditor: React.FC<MilkdownEditor> = () => {
  const { editor, getInstance } = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root),
          ctx.set(defaultValueCtx, DEFAULT_MARKDOWN),
          // // 代码的默认形式？
          // ctx.set(defaultValueCtx,{
          //     type:'html',
          //     dom:document.querySelector('#pre') as HTMLElement
          //   })
          ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {})
      })
      .use(nord)
      .use(commonmark)
      .use(history)
      .use(listener)
      .use(prism)
      .use(menu)
  )
  const instance = getInstance()
  instance?.action((ctx) => {
    ctx.get(themeManagerCtx).switch(ctx, nordDark)
  })
  useEffect(() => {
    const handleRightClick = () => {
      console.log('right-click')
    }
    const editor = document.querySelector('.editor')
    editor?.addEventListener('contextmenu', handleRightClick)
    return editor?.removeEventListener('contextmenu', handleRightClick)
  })
  return <ReactEditor editor={editor} />
}

import React, { useEffect, useState } from 'react'
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { ReactEditor, useEditor } from '@milkdown/react'
// 通用markdown预设
import { commonmark } from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'
import { defaultMarkdown } from '../constant'
import { listenerCtx, listener } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { menu } from '@milkdown/plugin-menu'
import { themeManagerCtx } from '@milkdown/core'
// 亮色主题
import { nordLight } from '@milkdown/theme-nord'
// 暗色主题
import { nordDark } from '@milkdown/theme-nord'
interface MilkdownEditor {
  onHeadersChange: Function
}
export const MilkdownEditor: React.FC<MilkdownEditor> = ({
  onHeadersChange
}) => {
  const [headers, setHeaders] = useState([{}])
  useEffect(() => {
    console.log('headers-change')
    onHeadersChange(headers)
  }, [headers.length])
  const { editor, getInstance } = useEditor(root =>
    Editor.make()
      .config(ctx => {
        ctx.set(rootCtx, root),
          ctx.set(defaultValueCtx, defaultMarkdown),
          // // 代码的默认形式？
          // ctx.set(defaultValueCtx,{
          //     type:'html',
          //     dom:document.querySelector('#pre') as HTMLElement
          //   })
          ctx
            .get(listenerCtx)
            .markdownUpdated((ctx, markdown, prevMarkdown) => {})
      })
      .use(nord)
      .use(commonmark)
      .use(history)
      .use(listener)
      .use(prism)
      .use(menu)
  )

  const instance = getInstance()
  instance?.action(ctx => {
    ctx.get(themeManagerCtx).switch(ctx, nordDark)
  })
  return <ReactEditor editor={editor} />
}

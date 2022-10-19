import React, { useEffect, useState } from 'react'
import { Editor } from '@milkdown/core'

import { ReactEditor, useEditor } from '@milkdown/react'
import { usePlugins } from './hooks/usePlugins'
import { themeManagerCtx } from '@milkdown/core'
import { replaceAll } from '@milkdown/utils'
import { nordDark } from '@milkdown/theme-nord'
import { useConfig } from './hooks/useConfig'
import { useUpdateHeaders } from '../SideBar/hooks/useUpdateHeader'
import { listenerCtx } from '@milkdown/plugin-listener'

interface MilkdownEditor {
  content: string
  filePath: string
}

export const MilkdownEditor: React.FC<MilkdownEditor> = ({ content, filePath }) => {
  const [markdown, setMarkdown] = useState('')
  const { editor, loading, getInstance } = useEditor((root) => {
    const newEditor = Editor.make()
    useConfig(newEditor, root)
    usePlugins(newEditor)
    return newEditor
  })
  // 全部替换，点击文件列表的时候起作用
  useEffect(() => {
    if (!loading) {
      const instance = getInstance()
      instance?.action(replaceAll(content))
      // 更新完成后再渲染标题
      useUpdateHeaders()
    }
  }, [loading, content])
  // 存储的函数必须根据副作用实时修改，否则不会更新
  useEffect(() => {
    window.api.updateFile({
      filePath: filePath,
      newFileContent: markdown
    })
  }, [markdown])

  useEffect(() => {
    const instance = getInstance()
    instance?.action((ctx) => {
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
        console.log('markdownUpdated')
        setMarkdown(markdown)
      })
    })
    instance!.action((ctx) => {
      ctx.get(themeManagerCtx).switch(ctx, nordDark)
    })
  }, [])
  return <ReactEditor editor={editor} />
}

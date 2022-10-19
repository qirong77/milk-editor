import React, { useEffect, useState } from 'react'
import { Editor, editorStateCtx } from '@milkdown/core'

import { ReactEditor, useEditor } from '@milkdown/react'
import { usePlugins } from './hooks/usePlugins'
import { themeManagerCtx } from '@milkdown/core'
import { replaceAll, getMarkdown } from '@milkdown/utils'
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
  useEffect(() => {
    if (!loading) {
      const instance = getInstance()
      instance?.action(replaceAll(content))
      useUpdateHeaders()
    }
  }, [loading, content])
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
        setMarkdown(markdown)
      })
    })
    instance?.action((ctx) => {
      ctx.get(themeManagerCtx).switch(ctx, nordDark)
    })
  }, [])
  return <ReactEditor editor={editor} />
}

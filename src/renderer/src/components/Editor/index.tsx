import React, { useEffect } from 'react'
import { Editor} from '@milkdown/core'

import { ReactEditor, useEditor } from '@milkdown/react'
import { usePlugins } from './hooks/usePlugins'
import { themeManagerCtx } from '@milkdown/core'
import { replaceAll } from '@milkdown/utils'
import { nordDark } from '@milkdown/theme-nord'
import { useConfig } from './hooks/useConfig'
interface MilkdownEditor {
  content: string
  filePath:string
}

export const MilkdownEditor: React.FC<MilkdownEditor> = ({ content,filePath}) => {
  // 组件更新时，useEditor不会被重新调用
  const { editor, loading, getInstance } = useEditor((root) => {
    const newEditor = Editor.make()
    useConfig(newEditor,root)
    usePlugins(newEditor)
    return newEditor
  },[])
  // 这个组件更新内容不会随着prop变化，需要手动设置
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

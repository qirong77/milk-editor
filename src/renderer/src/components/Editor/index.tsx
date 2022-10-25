import React, { useEffect, useState } from 'react'
import { Editor } from '@milkdown/core'

import { ReactEditor, useEditor } from '@milkdown/react'
import { usePlugins } from './hooks/usePlugins'
import { replaceAll } from '@milkdown/utils'
import { useConfig } from './hooks/useConfig'
import { useUpdateHeaders } from '../SideBar/hooks/useUpdateHeader'
import { SAVE_FILE } from '../../../../main/electron/events/constant'

interface MilkdownEditor {
  content: string
  filePath: string
}

export const MilkdownEditor: React.FC<MilkdownEditor> = ({ content, filePath }) => {
  console.log('MilkdownEditor-render')
  const [markdown, setMarkdown] = useState('')
  const { editor, loading, getInstance } = useEditor((root) => {
    const newEditor = Editor.make()
    useConfig(newEditor, root, setMarkdown)
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
    window.api.sendEvents(SAVE_FILE,{
      filePath: filePath,
      newFileContent: markdown
    })
  }, [markdown])
  return <ReactEditor editor={editor} />
}

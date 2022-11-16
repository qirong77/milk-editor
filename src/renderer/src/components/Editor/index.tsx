import React, { useEffect, useState } from 'react'
import { Editor } from '@milkdown/core'

import { ReactEditor, useEditor } from '@milkdown/react'

import { replaceAll } from '@milkdown/utils'
import { useConfig } from './hooks/useConfig'
import { usePlugins } from './hooks/usePlugin'
import { updateHeaders } from '../SideBar/utils/updateHeaders'
import { SAVE_FILE } from '../../../../common/eventType'

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
      updateHeaders()
    }
  }, [loading, content])
  // 存储的函数必须根据副作用实时修改，否则不会更新
  useEffect(() => {
    window.api.sendToMain(SAVE_FILE, filePath, markdown)
    console.log('update-' + filePath)
  }, [markdown])
  return <ReactEditor editor={editor} />
}

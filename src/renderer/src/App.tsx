import { basename } from 'path-browserify'
import { useEffect, useState } from 'react'
import { OPEN_FILE, RENAME_FILE_DONE } from '../../common/eventType'
import { MilkdownEditor } from './components/Editor'
import { GlobalComponents } from './components/Global'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'

export const App = () => {
  const [filePath, setFilePath] = useState('untitle')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('untitle')
  const hanldeRename = (beforeRenamePath: string, newPath: string) => {
    // console.log(newPath)
    // console.log(beforeRenamePath)
    console.log(filePath)
    if (beforeRenamePath === filePath) {
      setTitle(basename(newPath))
      setFilePath(newPath)
    }
  }
  useEffect(() => {
    window.api.onMain(OPEN_FILE, (_e, { filePath, fileContent, fileName }) => {
      setFilePath(filePath)
      setContent(fileContent)
      setTitle(fileName)
    })
    window.api.onMain(RENAME_FILE_DONE, (_e, newPath, newName, beforeRenamePath) => {
      // 重命名的时候可能不是你打开的目录，所以要判断需不需要更新保存的路径
      hanldeRename(beforeRenamePath, newPath)
    })
  }, [])
  return (
    <div className="container">
      <Header title={title} />
      <main>
        <SideBar />
        <MilkdownEditor content={content} filePath={filePath} />
      </main>
      <GlobalComponents />
    </div>
  )
}

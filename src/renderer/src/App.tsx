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
  useEffect(() => {
    window.api.onMain(OPEN_FILE, (_e, { filePath, fileContent, fileName }) => {
      setFilePath(filePath)
      setContent(fileContent)
      setTitle(fileName)
    })
    window.api.onMain(RENAME_FILE_DONE, (_e, beforeRenamePath,newPath) => {
      // 重命名的时候可能不是你打开的目录，所以要判断需不需要更新保存的路径
      const activeNow = document.querySelector('.file-item-active')?.getAttribute('id')
      if(activeNow===newPath) {
        setTitle(basename(newPath))
        setFilePath(newPath)
      }
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

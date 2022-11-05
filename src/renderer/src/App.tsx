import { useEffect, useState } from 'react'
import { OPEN_FILE } from '../../common/eventType'



import { MilkdownEditor } from './components/Editor'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'

export const App = () => {
  const [filePath, setFilePath] = useState('untitle')
  const [content, setContent] = useState('')
  const [title,setTitle] = useState('untitle')
  useEffect(() => {
    window.api.onMain(OPEN_FILE, (_e, { filePath, fileContent,fileName }) => {
      setFilePath(filePath)
      setContent(fileContent)
      setTitle(fileName)
    })
  }, [])
  return (
    <div className="container">
      <Header title={title} />
      <main>
        <SideBar />
        <MilkdownEditor content={content} filePath={filePath} />
      </main>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { OPEN_FILE } from '../../common/eventType'



import { MilkdownEditor } from './components/Editor'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'

export const App = () => {
  const [filePath, setFilePath] = useState('untitle')
  const [content, setContent] = useState('')
  useEffect(() => {
    window.api.onMain(OPEN_FILE, (_e, { filePath, fileContent }) => {
      setFilePath(filePath)
      setContent(fileContent)
    })
  }, [])
  return (
    <div className="container">
      <Header title={filePath} />
      <main>
        <SideBar />
        <MilkdownEditor content={content} filePath={filePath} />
      </main>
    </div>
  )
}

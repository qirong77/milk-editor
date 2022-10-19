import { useEffect, useState } from 'react'
import { IFileList } from 'src/preload/index.d'
import { MilkdownEditor } from './components/Editor'
import { Header } from './components/Header'
import { Search } from './components/Search'
import { SideBar } from './components/SideBar'

export const App = () => {
  const [content, setContent] = useState('')
  const [filePath, setPath] = useState('title')
  const [fileList, setFileList] = useState<IFileList>([])

  // 左上角的打开文件功能，是主进程向渲染进程发送数据
  useEffect(() => {
    window.api.onOpenFile((e, { filePath, fileContent }) => {
      setPath(filePath)
      console.log('onOpenFileAPI')
      setContent(fileContent)
    })
  }, [])

  // 打开默认文件夹
  useEffect(() => {
    const useDefaulteDir = async () => {
      const fileList = await window.api.openDefaultDir()
      setFileList(fileList)
    }
    useDefaulteDir()
  }, [])
  return (
    <div className="container">
      <Header opendFilePath={filePath} />
      <main>
        <SideBar fileList={fileList} />
        <MilkdownEditor content={content} filePath={filePath} />
      </main>
      <Search />
    </div>
  )
}

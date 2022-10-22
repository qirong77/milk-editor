import { useEffect, useState } from 'react'
import { IFileList } from 'src/preload/index.d'
import { MilkdownEditor } from './components/Editor'
import { Header } from './components/Header'
import { SearchWord } from './components/Search/SearchWord'
import { SideBar } from './components/SideBar'
import { useUpdateHeaders } from './components/SideBar/hooks/useUpdateHeader'

export const App = () => {
  const [content, setContent] = useState('')
  const [filePath, setPath] = useState('title')
  const [fileList, setFileList] = useState<IFileList>([])
  const [openSearchWords,setOpenSearchWords] = useState(false)
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
  useEffect(() => {
    const SideBar = document.querySelector('.side-bar') as HTMLElement
    const SearchWord = document.querySelector('.search-word')
    const hanldeHideBar = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        console.log('command + B')
        useUpdateHeaders()
        SideBar?.classList.toggle('side-bar-close')
      }
      if (e.metaKey && e.code === 'KeyF') {
        SearchWord?.classList.toggle('search-word-close')
      }
    }
    document.addEventListener('keydown', hanldeHideBar)
    return () => document.removeEventListener('keydown', hanldeHideBar)
  }, [openSearchWords])
  return (
    <div className="container">
      <Header opendFilePath={filePath} />
      <main>
        <SideBar fileList={fileList} />
        <MilkdownEditor content={content} filePath={filePath} />
      </main>
      {openSearchWords && <SearchWord />}
    </div>
  )
}

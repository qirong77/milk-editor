import { useEffect, useState } from 'react'
import { MilkdownEditor } from './components/Editor'
import { Header } from './components/Header'
import { Search } from './components/Search'
import { SideBar } from './components/SideBar'
import { useUpdateHeaders } from './components/SideBar/hooks/useUpdateHeader'

export const App = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('title')
  useEffect(() => {
    console.log('effect')
    window.api.onOpenFile((e, { filePath, fileContent }) => {
      const MARKDOWN_FILE = /([^\/]+)\.md/i
      const regexArray = filePath.match(MARKDOWN_FILE)
      if (regexArray) {
        setTitle(regexArray[0])
      }
      console.log('onOpenFileAPI')
      setContent(fileContent)
      // 因为你更新markdown的内容后，可能页面还没渲染完，现在暂时用定时器解决一下
      setTimeout(()=>{
        useUpdateHeaders()
      },1200)
    })
  }, [])
  // 打开默认文件夹
  useEffect(()=>{

  },[])
  return (
    <div className="container">
      <Header title={title} />
      <main>
        <SideBar />
        <MilkdownEditor content={content} />
      </main>
      <Search />
    </div>
  )
}

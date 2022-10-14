import { useEffect, useState } from 'react'
import { MilkdownEditor } from './components/Editor'
import { Header } from './components/Header'
import { Search } from './components/Search'
import { SideBar } from './components/SideBar'

export const App = () => {
  // const [content,setContent] = useState('')
  // const [title,setTitle] = useState('title')
  // useEffect(()=>{
  //   console.log('effect')
  //   // window.api.onOpenFile((e,{fileContent})=>{
  //   //   setContent(fileContent)
  //   // })
  //   return ()=>{
  //     console.log('return')
  //   }
  // },[])
  return (
    <div className="container">
      {/* <Header title={title}/> */}
      {/* <main>
        <SideBar />
        <MilkdownEditor content={content}/>
      </main> */}
      {/* <Search /> */}
    </div>
  )
}

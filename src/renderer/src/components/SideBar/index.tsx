import { useState } from 'react'
import { FileList } from './components/FileList'
import { Footer } from './components/Footer'
import { HeaderList } from './components/HeaderList'
import { SideBarHeader } from './components/SideBarHeader'

export const SideBar = () => {
  const [toggle, setToggle] = useState(true)
  const [title, setTitle] = useState('文件')
  const clickMenu = () => {
    if (!toggle) {
      setTitle('文件')
    }
    toggle && setTitle('大纲')
    setToggle(!toggle)
  }
  return (
    <div className="side-bar">
      <SideBarHeader title={title} clickMenu={clickMenu} />
      {toggle && <FileList />}
      {!toggle && <HeaderList />}
      <Footer />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { SearchFile } from '../Global/SearchFile'
import { FileList } from './components/FileList'
import { Footer } from './components/Footer'
import { HeaderList } from './components/HeaderList'
import { SideBarHeader } from './components/SideBarHeader'

export const SideBar = () => {
  const [toggle, setToggle] = useState(true)
  const [title, setTitle] = useState('文件')
  const [showSearchFile, setShowSearchFile] = useState(false)
  const clickMenu = () => {
    if (!toggle) {
      setTitle('文件')
    }
    toggle && setTitle('大纲')
    setToggle(!toggle)
  }
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.metaKey && e.code === 'KeyB') {
      const SideBar = document.querySelector('.side-bar') as HTMLElement
      console.log('commend + B')
      //updateHeaders()
      SideBar?.classList.toggle('side-bar-close')
    }
    if (e.metaKey && e.code === 'KeyP') {
      console.log('commend + P')
      setShowSearchFile(!showSearchFile)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [showSearchFile])

  return (
    <div className="side-bar">
      <SideBarHeader title={title} clickMenu={clickMenu} />
      <FileList toggle={toggle} />
      <HeaderList toggle={toggle} />
      <Footer />
      <SearchFile
        showSearchFile={showSearchFile}
        closeSearchFile={() => setShowSearchFile(false)}
        openHeaderList={() => setToggle(false)}
      />
    </div>
  )
}

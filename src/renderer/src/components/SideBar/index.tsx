import { useEffect, useRef, useState } from 'react'
import { SearchFile } from '../Global/SearchFile'
import { FileList } from './components/FileList'
// import { Footer } from './components/Footer'
import { HeaderList } from './components/HeaderList'
import { SideBarHeader } from './components/SideBarHeader'

export const SideBar = () => {
  console.log('SideBar-render')
  const [toggle, setToggle] = useState(true)
  const [title, setTitle] = useState('文件')
  const [showSearchFile, setShowSearchFile] = useState(false)
  const [isClose, setClose] = useState(false)
  const clickMenu = () => {
    if (!toggle) {
      setTitle('文件')
    }
    toggle && setTitle('大纲')
    setToggle(!toggle)
  }

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        setClose(!isClose)
      }
      if (e.metaKey && e.code === 'KeyP') {
        setShowSearchFile(!showSearchFile)
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [showSearchFile, isClose])
  return (
    <div
      className="side-bar"
      style={{
        display: isClose ? 'none' : 'block'
      }}
    >
      <SideBarHeader title={title} clickMenu={clickMenu} />
      <FileList toggle={toggle} setToggle={setToggle} />
      <HeaderList toggle={toggle} />
      {/* <Footer /> */}
      <SearchFile
        showSearchFile={showSearchFile}
        closeSearchFile={() => setShowSearchFile(false)}
        openHeaderList={() => setToggle(false)}
      />
    </div>
  )
}

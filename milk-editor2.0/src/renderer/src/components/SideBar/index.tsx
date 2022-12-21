import { useEffect, useState } from 'react'

import { FileList } from './components/FileList'
// import { Footer } from './components/Footer'
import { HeaderList } from './components/HeaderList'
import { SideBarHeader } from './components/SideBarHeader'
import { SearchWordGlobal } from './components/SearchWordGlobal'
export const SideBar = () => {
  console.log('SideBar-render')
  const [toggle, setToggle] = useState(true)
  const [title, setTitle] = useState('文件')

  const [isClose, setClose] = useState(false)
  const [showGlobalSearch, setGlobalSearch] = useState(false)
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

      if (e.metaKey && e.shiftKey && e.code === 'KeyF') {
        setGlobalSearch(!showGlobalSearch)
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [isClose, showGlobalSearch])
  return (
    <div
      className="side-bar"
      style={{
        display: isClose ? 'none' : 'block'
      }}
    >
      <SideBarHeader title={title} clickMenu={clickMenu} />
      <>
        <FileList toggle={toggle} />
        <HeaderList toggle={toggle} />
      </>
      <SearchWordGlobal show={showGlobalSearch} />
      {/* <Footer /> */}
    </div>
  )
}

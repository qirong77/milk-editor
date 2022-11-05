import { useEffect, useState } from 'react'
import { DragLine } from './DragLine'
import { SearchFile } from './SearchFile'

export const GlobalComponents = () => {
  const [showSearchFile, setShowSearchFile] = useState(false)
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.metaKey && e.code === 'KeyM') {
      const MenuBar = document.querySelector('.milkdown-menu')
      console.log('commend + M')
      console.log(MenuBar)
      MenuBar?.classList.toggle('milkdown-menu-open')
    }
    if (e.metaKey && e.code === 'KeyB') {
      const SideBar = document.querySelector('.side-bar') as HTMLElement
      console.log('commend + B')
      //updateHeaders()
      SideBar?.classList.toggle('side-bar-close')
    }
    if (e.metaKey && e.code === 'KeyF') {
      console.log('commend + F')
      // setOpenSearchWords(!openSearchWords)
    }
    if (e.metaKey && e.code === 'KeyP') {
      console.log('commend + P')
      setShowSearchFile(!showSearchFile)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])
  return (
    <>
      {showSearchFile && (
        <SearchFile fileList={[]} closeSearchFile={() => setShowSearchFile(false)} />
      )}
      <DragLine/>
    </>
  )
}

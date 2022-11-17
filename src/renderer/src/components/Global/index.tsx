import { useEffect, useState } from 'react'
import { DragLine } from './components/DragLine'
import { SearchFile } from './components/SearchFile'
import { SearchWord } from './components/SearchWord'

const dfs = (root: HTMLElement) => {
  root.childNodes.forEach((child) => {
    if (child instanceof HTMLElement) {
      dfs(child)
    } else {
      const textContent = child.textContent
    }
  })
}
export const GlobalComponents = () => {
  const [showSearchWord, setShowSearchWord] = useState(false)
  const [showSearchFile, setShowSearchFile] = useState(false)
  
  const [word, setWord] = useState('')

  useEffect(() => {
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
        SideBar?.classList.toggle('side-bar-close')
      }
      if (e.metaKey && e.code === 'KeyF') {
        setShowSearchWord(!showSearchWord)
      }
      if (e.metaKey && e.code === 'KeyP') {
        setShowSearchFile(!showSearchFile)
      }
      if (e.code === 'Enter') {

      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [word, showSearchFile])

  return (
    <>
      <DragLine />
      {
        <SearchFile
          showSearchFile={showSearchFile}
          closeSearchFile={() => setShowSearchFile(false)}
        />
      }
      {showSearchWord && <SearchWord setWord={setWord} />}
    </>
  )
}

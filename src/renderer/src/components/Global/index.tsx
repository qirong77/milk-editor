import { useEffect, useState } from 'react'
import { DragLine } from './DragLine'
import { SearchWord } from './SearchWord'
const wordx = '前端'
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
  const [nodeList, setNodeList] = useState<HTMLElement[]>([])
  const [word, setWord] = useState('')
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
      console.log('commend + F')
      setShowSearchWord(!showSearchWord)
    }
    if (e.code === 'Enter') {
      // console.log('search:' + word)
      // const editor = document.querySelector('.editor') as HTMLElement
      // const pre = document.querySelector('pre')
      // if (pre) {
      //   pre.scrollIntoView()
      //   pre.classList.add('xxxx')
      //   console.log(pre)
      // }
      // console.log(editor)
      // editor && dfs(editor)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [word])

  return (
    <>
      <DragLine />
      {showSearchWord && <SearchWord setWord={setWord} />}
    </>
  )
}

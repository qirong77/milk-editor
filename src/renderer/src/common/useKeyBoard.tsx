import { useUpdateHeaders } from '@renderer/components/SideBar/hooks/useUpdateHeader'
import { useEffect } from 'react'

export const useKeyBoard = () => {
  useEffect(() => {
    const SideBar = document.querySelector('.side-bar') as HTMLElement
    const SearchFile = document.querySelector('.search-file')
    const SearchWord = document.querySelector('.search-word')
    const hanldeHideBar = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        console.log('command + B')
        useUpdateHeaders()
        SideBar?.classList.toggle('side-bar-close')
      }
      if (e.code === 'ArrowUp' && SideBar.style.display !== 'none') {
        console.log('up')
      }
      if (e.code === 'ArrowDown') {
      }
      if (e.code === 'KeyP' && e.metaKey) {
        console.log('commend + P')
        console.log(SearchFile)
        SearchFile?.classList.toggle('search-file-close')
      }
      if (e.metaKey && e.code === 'KeyF') {
        SearchWord?.classList.toggle('search-word-close')
      }
    }
    document.addEventListener('keydown', hanldeHideBar)
    return () => document.removeEventListener('keydown', hanldeHideBar)
  }, [])
}

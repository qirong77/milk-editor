import React, { useEffect, useRef } from 'react'
import { useUpdateHeaders } from '../hooks/useUpdateHeader'

interface IHeaderList {}

export const HeaderList: React.FC<IHeaderList> = () => {
  const headerListRef = useRef(null)
  useEffect(() => {
    const sideBar = document.querySelector('.side-bar') as HTMLElement
    const hanldeHideBar = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        console.log('command + B')
        useUpdateHeaders()
        sideBar.classList.toggle('side-bar-close')
      }
    }
    document.addEventListener('keydown', hanldeHideBar)
    return () => document.removeEventListener('keydown', hanldeHideBar)
  }, [])
  return <ul className={'header-list'} ref={headerListRef}></ul>
}

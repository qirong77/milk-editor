import { LegacyRef, useEffect, useRef, useState } from 'react'
import { DragLine } from './DragLine'
import { HeaderList } from './HeaderList'

export const SideBar = () => {
  const [update, setUpdate] = useState(false)

  const sideBarRef = useRef<HTMLDivElement>()
  useEffect(() => {
    const hanldeHideBar = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        sideBarRef.current?.classList.toggle('side-bar-close')
        setUpdate(!update)
      }
    }
    document.addEventListener('keydown', hanldeHideBar)
    return () => document.removeEventListener('keydown', hanldeHideBar)
  },[])
  return (
    <div className="side-bar" ref={sideBarRef as LegacyRef<HTMLDivElement>}>
      <header>
        <span>文件</span>
      </header>
      <DragLine />
      <HeaderList shouldUpdate={update} />
    </div>
  )
}

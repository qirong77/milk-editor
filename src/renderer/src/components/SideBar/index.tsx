import { LegacyRef, useEffect, useRef, useState } from 'react'
import { DragLine } from './DragLine'
import { HeaderList } from './HeaderList'

export const SideBar = () => {
  const [update, setUpdate] = useState(0)
  const sideBarRef = useRef<HTMLDivElement>()
  useEffect(() => {
    const hanldeHideBar = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        console.log('command + B')
        sideBarRef.current?.classList.toggle('side-bar-close')
        setUpdate(Math.random())
      }
    }
    document.addEventListener('keydown', hanldeHideBar)
    return () => document.removeEventListener('keydown', hanldeHideBar)
  }, [])
  useEffect(() => {
    window.api.onUpdateEditor(() => {
      // 这里使用定时器是因为可能编辑器还没渲染完，后面看看有没有什么办法,这样好像也行，引文编辑器渲染是同步的
      setTimeout(()=>{
        setUpdate(Math.random())
      })
    })
  }, [])
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

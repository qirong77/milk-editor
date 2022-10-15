import { LegacyRef, useEffect, useRef, useState } from 'react'

export const Search = () => {
  const [show, setShow] = useState(true)
  const iptRef = useRef<HTMLInputElement>()
  const serarchStr = () => {
    // 需要配置electron 的全选快捷键再能在输入框全选
    const editor = document.querySelector('.ProseMirror') as HTMLElement
    const searchText = iptRef.current?.value
    // 好像是不能直接操作milkdown上面的元素，比如改变类名，增加用fragment增加标签，需要看文档
    const dfs = (nodes: NodeListOf<ChildNode>) => {
      nodes.forEach((node) => {
        // element
        if (node.nodeType === 1) {
        }
      })
    }
    dfs(editor.childNodes)
  }
  useEffect(() => {
    const handleCommandK = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyF') {
        setShow(!show)
        // 不生效？
        show && iptRef.current?.focus()
      } else if (e.code === 'Enter') {
        serarchStr()
      }
    }
    document.addEventListener('keydown', handleCommandK)
    return () => {
      document.removeEventListener('keydown', handleCommandK)
    }
  })
  return (
    <div className={show ? 'search-wrapper search-wrapper-close' : 'search-wrapper'}>
      <input type="text" ref={iptRef as LegacyRef<HTMLInputElement>} />
    </div>
  )
}

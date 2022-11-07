import { useRef, useState } from 'react'
import { dirTree } from './dirTree'

export type FileTree = {
  fileName: string
  level: number
  children: FileTree[]
  path: string
  isDir: boolean
}
const DirItem: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <>
      <div>
        <svg
          className="triangle-down"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
        <svg
          className="folder-open"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
        </svg>
        <svg
          className="folder-close"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z" />
        </svg>
      </div>
      <span>{fileName}</span>
    </>
  )
}
/*  功能列表
1. 删除 done-提升到顶部用dom选择器解决，但是无法更改内部的数据，所以还需要内部监听，但是这样会有多个监听，而且你监听回来还需要判断是不是操作当前的组件节点
2. 改名 done
3. 新增 无法解决
*/
const createLi = (_path: string, fileName: string, isDir: boolean) => {
  const [path, setPath] = useState(_path)
  const [showInput, setShowInput] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const handleContext = () => {
    if (isDir) {
      // 打开右键菜单
    } else {
      // 打开文件的右键菜单
    }
  }
  const clickLi = () => {
    if (isDir) {
      ref.current?.parentElement?.classList.toggle('close')
    } else {
      // 打开文件
    }
  }
  const iptBlur = () => {}
  const iptKeyDown = () => {}
  return (
    <li ref={ref}>
      {isDir && <DirItem fileName={fileName} />}
      {!isDir && <span>{fileName}</span>}
      <input
        onBlur={iptBlur}
        onKeyDown={iptKeyDown}
        style={{
          display: showInput ? 'block' : 'none'
        }}
        type="text"
        value={path}
      />
    </li>
  )
}
const mapFileTree = ({ fileName, level, children, path, isDir }: FileTree) => {
  if (!isDir)
    return (
      <li id={path} className="file-item">
        <span>{fileName}</span>
      </li>
    )
  const ul = (
    <ul>
      <>
        <li id={path} className={'dir'}>
          <DirItem fileName={fileName} />
        </li>
        {children.map((file) => {
          return mapFileTree(file)
        })}
      </>
    </ul>
  )
  return ul
}

export const App = () => {
  const [contextLi, setContextLi] = useState(0)
  return <div>{mapFileTree(dirTree)}</div>
}

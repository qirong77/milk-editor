import { useEffect, useRef, useState } from 'react'
import { IFileList } from 'src/preload/index.d'

interface ISearchFile {
  fileList: IFileList
  openFile: (filePath: string) => void
  closeSearchFile: () => void
}
const mapFiles = (fileList: IFileList) => {
  const files = fileList.map((file, index) => {
    return (
      <li key={file.filePath} className={index === 0 ? 'active' : ''}>
        <span>{file.fileName}</span>
      </li>
    )
  })
  return files
}
export const SearchFile: React.FC<ISearchFile> = ({ fileList, openFile, closeSearchFile }) => {
  const [active, setActive] = useState(0)
  const iptRef = useRef<HTMLInputElement>(null)
  const filesContainer = useRef<HTMLUListElement>(null)

  const [files, setFiles] = useState(mapFiles(fileList))

  useEffect(() => {
    // 在active更新后执行，否则不会按照你的预定的去
    const lis = filesContainer.current?.children
    if (lis) {
      ;[...lis].forEach((li, index) => {
        li.classList.remove('active')
      })
      const target = lis[active]
      target.classList.add('active')
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entrie) => {
          //如果不可见,就需要向上滚动或者向下滚动
          if (entrie.intersectionRatio < 0.5) {
            if (active > 8) target?.scrollIntoView(false)
            else target?.scrollIntoView(true)
          }
          // 不管是否可见，操作完就移除观察
          io.unobserve(target)
        })
      })
      io.observe(target)
    }
  }, [active])
  useEffect(() => {
    iptRef.current?.focus()
    const hanleSelect = (e: KeyboardEvent) => {
      const ARROW_DOWN = 'ArrowDown'
      const ARROW_UP = 'ArrowUp'
      if (e.code === ARROW_UP) {
        if (!files[active - 1]) {
          setActive(files.length - 1)
        } else {
          setActive(active - 1)
        }
      }
      if (e.code === ARROW_DOWN) {
        if (!files[active + 1]) {
          setActive(0)
        } else {
          setActive(active + 1)
        }
      }
      if (e.code === 'Enter') {
        const filePath = files[active]?.key as string
        filePath && openFile(filePath)
        closeSearchFile()
      }
    }
    document.addEventListener('keydown', hanleSelect)
    return () => document.removeEventListener('keydown', hanleSelect)
    // 因为处理函数里面有依赖到active，所以必须传递这个依赖进去
  }, [active, files])
  const updateFiles = () => {
    const searchStr = iptRef.current?.value || ''
    const newFileList = fileList.filter((file) => {
      if (file.fileName.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())) return true
      else return false
    })
    setFiles(mapFiles(newFileList))
    setActive(0)
  }
  return (
    <div className="search-file ">
      <div>
        <span>{active}</span>
        <input placeholder="" onChange={updateFiles} ref={iptRef} type="text" />
      </div>
      <ul ref={filesContainer}>{files}</ul>
    </div>
  )
}
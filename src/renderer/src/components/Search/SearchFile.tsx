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
let active = 0

export const SearchFile: React.FC<ISearchFile> = ({ fileList, openFile, closeSearchFile }) => {
  const [files, setFiles] = useState(mapFiles(fileList))

  const iptRef = useRef<HTMLInputElement>(null)
  const hanleSelect = (e: KeyboardEvent) => {
    const files = document.querySelectorAll<HTMLElement>('.search-file ul li')
    const ARROW_DOWN = 'ArrowDown'
    const ARROW_UP = 'ArrowUp'
    if (e.code === ARROW_UP) {
      files[active].classList.remove('active')
      if (!files[active - 1]) {
        active = files.length - 1
        files[active].classList.add('active')
      } else {
        files[active - 1].classList.add('active')
        active -= 1
      }
    }
    if (e.code === ARROW_DOWN) {
      files[active].classList.remove('active')
      console.log(active)
      if (!files[active + 1]) {
        active = 0
        files[active].classList.add('active')
      } else {
        files[active + 1].classList.add('active')
        active += 1
      }
    }
    const Element = files[active]
    console.log(Element.innerText)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        if (entrie.intersectionRatio < 0.5) {
          if (e.code === ARROW_DOWN) Element.scrollIntoView(false)
          else Element.scrollIntoView(true)
        }
        // 不论如何都需要移除当前的观察项，保证只有一项
        io.unobserve(Element)
      })
    })
    io.observe(Element)
    if (e.code === 'Enter') {
      const filePath = fileList[active].filePath
      console.log(filePath)
      // openFile(filePath)
      // closeSearchFile()
    }
  }
  useEffect(() => {
    iptRef.current?.focus()
    document.addEventListener('keydown', hanleSelect)
    return () => document.removeEventListener('keydown', hanleSelect)
  }, [fileList])
  const updateFiles = () => {
    const searchStr = iptRef.current?.value || ''
    const newFileList = fileList.filter((file) => {
      if (file.fileName.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())) return true
      else return false
    })
    console.log(newFileList)
    setFiles(mapFiles(newFileList))
  }
  return (
    <div className="search-file ">
      <div>
        <input placeholder="xx" onChange={updateFiles} ref={iptRef} type="text" />
      </div>
      <ul>{files}</ul>
    </div>
  )
}

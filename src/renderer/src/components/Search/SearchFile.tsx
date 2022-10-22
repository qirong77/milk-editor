
import { useEffect, useRef } from 'react'
import { IFileList } from 'src/preload/index.d'

interface ISearchFile {
  fileList: IFileList
  openFile:(filePath:string) => void
  closeSearchFile:()=>void
}
export const SearchFile: React.FC<ISearchFile> = ({ fileList,openFile ,closeSearchFile}) => {
  let active = 0
  const iptRef = useRef<HTMLInputElement>(null)
  const files = fileList.map((file, index) => {
    return (
      <li key={file.filePath} className={index === 0 ? 'active' : ''}>
        <span>{file.fileName}</span>
      </li>
    )
  })
  const hanleSelect = (e: KeyboardEvent) => {
    const files = document.querySelectorAll<HTMLElement>('.search-file ul li')
    if (e.code === 'ArrowUp') {
      console.log('up')
      files[active].classList.remove('active')
      if (!files[active - 1]) {
        active = files.length - 1
        files[active].classList.add('active')
      } else {
        files[active - 1].classList.add('active')
        active -= 1
      }
    }
    if (e.code === 'ArrowDown') {
      console.log('down')
      console.log(active)
      files[active].classList.remove('active')
      if (!files[active + 1]) {
        active = 0
        files[active].classList.add('active')
      } else {
        files[active + 1].classList.add('active')
        active += 1
      }
    }
    if (e.code === 'Enter') {
      const filePath = fileList[active].filePath
      openFile(filePath)
      closeSearchFile()
    }
  }
  useEffect(() => {
    iptRef.current?.focus()
    document.addEventListener('keydown', hanleSelect)
    return () => document.removeEventListener('keydown', hanleSelect)
  }, [fileList])
  return (
    <div className="search-file ">
      <div>
        <input placeholder='xx' ref={iptRef} type="text" />
      </div>
      <ul>{files}</ul>
    </div>
  )
}

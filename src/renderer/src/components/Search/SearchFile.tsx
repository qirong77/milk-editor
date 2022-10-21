import { useOpenFile } from '@renderer/common/useOpenFile'
import { useEffect, useState } from 'react'
import { IFileList } from 'src/preload/index.d'

interface ISearchFile {
  fileList: IFileList
}
export const SearchFile: React.FC<ISearchFile> = ({ fileList }) => {
  console.log(fileList)
  let active = 0
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
      // console.log(filePath)
      // console.log(fileList[active])
      useOpenFile(filePath)
      document.querySelector('.search-file')?.classList.toggle('search-file-close')
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', hanleSelect)
    return () => document.removeEventListener('keydown', hanleSelect)
  }, [fileList])
  return (
    <div className="search-file ">
      <div>
        <input type="text" />
      </div>
      <ul>{files}</ul>
    </div>
  )
}

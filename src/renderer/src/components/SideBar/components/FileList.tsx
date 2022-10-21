import { useOpenFile } from '@renderer/common/useOpenFile'
import React from 'react'
import { IFileList } from 'src/preload/index.d'

export const FileList: React.FC<{
  fileList: IFileList
  show: boolean
  setShowFileList: (show: boolean) => void
}> = ({ fileList, setShowFileList, show }) => {
  const openFile = (filePath) => {
    useOpenFile(filePath)
    setShowFileList(!show)
  }
  return (
    <ul className="file-list">
      {fileList.map(({ fileName, filePath }) => {
        return (
          <li
            key={filePath}
            onClick={(e) => {
              e.stopPropagation()
              openFile(filePath)
            }}
          >
            <div></div>
            <span>{fileName}</span>
          </li>
        )
      })}
    </ul>
  )
}

import { useOpenFile } from '@renderer/common/useOpenFile'
import { useToggleSideBar } from '@renderer/common/useToggleSideBar'
import React from 'react'
import { IFileList } from 'src/preload/index.d'

export const FileList: React.FC<{
  fileList: IFileList

}> = ({ fileList}) => {
  const openFile = (filePath) => {
    useOpenFile(filePath)
    useToggleSideBar()
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

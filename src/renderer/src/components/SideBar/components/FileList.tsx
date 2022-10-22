import { NewFileSvg } from '@renderer/common/svg'
import React, { useEffect, useRef, useState } from 'react'
import { IFileList } from 'src/preload/index.d'

export const FileList: React.FC<{
  fileList: IFileList
  openFile:(filePath:string) => void
}> = ({ fileList,openFile }) => {
  const [showNewFile, setShowNewFile] = useState(false)
  const iptRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    iptRef.current?.focus()
    const handeReturn = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        setShowNewFile(false)
      }
    }
  }, [])
  return (
    <>
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
        {showNewFile && (
          <li
            style={{
              display: 'flex'
            }}
            className="new-file"
          >
            <input ref={iptRef} style={{}} type="text" />
          </li>
        )}
      </ul>
      <footer>
        <NewFileSvg onClick={() => setShowNewFile(true)} />
        <span>footer</span>
        <NewFileSvg onClick={() => setShowNewFile(true)} />
      </footer>
    </>
  )
}

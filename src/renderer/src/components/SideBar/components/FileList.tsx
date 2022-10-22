import { NewFileSvg } from '@renderer/common/svg'
import React, { useEffect, useRef, useState } from 'react'
import { IFileList } from 'src/preload/index.d'

export const FileList: React.FC<{
  fileList: IFileList
  openFile: (filePath: string) => void
}> = ({ fileList, openFile }) => {
  console.log('file-list-render')
  const [showNewFile, setShowNewFile] = useState(false)
  const iptRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    iptRef.current?.focus()
    const handeReturn = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && showNewFile) {
        setShowNewFile(false)
        window.api.newFile(iptRef.current?.value || 'untitled')
        window.api.openDefaultDir()
      }
    }
    document.addEventListener('keydown', handeReturn)
    return () => document.removeEventListener('keydown', handeReturn)
  }, [showNewFile])
  return (
    <>
      <ul
        className="file-list"
        style={{
          paddingBottom: '50px'
        }}
      >
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
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '20px'
            }}
            className="new-file"
          >
            <input
              ref={iptRef}
              style={{
                height: '80%',
                paddingLeft: '4px'
              }}
              type="text"
            />
          </li>
        )}
      </ul>
      <footer>
        <NewFileSvg onClick={() => setShowNewFile(true)} />
        <span>Markdowns</span>
        <NewFileSvg onClick={() => setShowNewFile(true)} />
      </footer>
    </>
  )
}

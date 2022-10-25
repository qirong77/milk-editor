import { MoreSvg, NewFileSvg } from '@renderer/common/svg'
import React, { useEffect, useRef, useState } from 'react'
import { IFileList } from 'src/preload/index.d'
import { NEW_FILE, POP_FILE_LIST_MENU } from '../../../../../main/electron/events/constant'

export const FileList: React.FC<{
  fileList: IFileList
  openFile: (filePath: string) => void
  updateFiles: () => void
}> = ({ fileList, openFile, updateFiles }) => {
  console.log('file-list-render')
  const [showNewFile, setShowNewFile] = useState(false)
  const iptRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    iptRef.current?.focus()
    const handleReturn = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && showNewFile) {
        console.log('enter')
        setShowNewFile(false)
        window.api.sendEvents(NEW_FILE,iptRef.current?.value || 'untitled')
        updateFiles()
      }
    }
    document.addEventListener('keydown', handleReturn)
    return () => document.removeEventListener('keydown', handleReturn)
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
              onContextMenu={() => {
                window.api.sendEvents(POP_FILE_LIST_MENU,filePath)
              }}
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
          <li className="new-file">
            <input ref={iptRef} type="text" />
          </li>
        )}
      </ul>
      <footer>
        <NewFileSvg onClick={() => setShowNewFile(!showNewFile)} />
        <span>Markdowns</span>
        <MoreSvg />
      </footer>
    </>
  )
}

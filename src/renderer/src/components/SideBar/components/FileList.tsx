import { useEffect, useRef } from 'react'
import {
  DELETE_DIR,
  DELETE_FILE,
  NEW_DIR,
  NEW_FILE,
  OPEN_DIR,
  POP_ROOT_MENU,
  RENAME_FILE
} from '../../../../../common/eventType'
import { openFile } from '../../../common/openFile'
import { focusNode } from '../hooks/focusNode'

import { mapFileList } from '../hooks/mapFileList'
import { createNode } from '../hooks/createNode'
export const FileList = ({ toggle }) => {
  console.log('render-fileTree-component')
  const ref = useRef<HTMLDivElement>(null)
  const setFileList = async () => {
    const fileTree = await window.api.onGetDirTree()
    const fileNodes = mapFileList(fileTree)
    ref.current!.innerHTML = ''
    ref.current?.appendChild(fileNodes)
  }
  useEffect(() => {
    setFileList()
    window.api.onMain(OPEN_DIR, (_e, newFileTree) => {
      const fileNodes = mapFileList(newFileTree)
      ref.current!.innerHTML = ''
      ref.current?.appendChild(fileNodes)
    })
    window.api.onMain(RENAME_FILE, (_e, path) => {
      focusNode(path)
    })
    window.api.onMain(DELETE_FILE, (_e, path) => {
      const target = document.getElementById(path)
      target?.parentElement?.removeChild(target)
    })
    window.api.onMain(DELETE_DIR, (_e, path) => {
      const ul = document.getElementById(path)?.parentElement
      ul?.parentElement?.removeChild(ul)
    })
    window.api.onMain(NEW_DIR, (_e, path, newPath) => {
      createNode(path, newPath, true)
    })
    window.api.onMain(NEW_FILE, (_e, path, newPath) => {
      createNode(path, newPath, false)
      openFile(newPath)
    })
  }, [])
  useEffect(() => {
    const handleContextMenu = async (e: MouseEvent) => {
      e.stopPropagation()
      const fileTree = await window.api.onGetDirTree()
      const path = fileTree.path
      window.api.sendToMain(POP_ROOT_MENU, path)
    }
    ref.current?.addEventListener('contextmenu', handleContextMenu)
    return () => {
      ref.current?.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])
  useEffect(() => {}, [])
  return (
    <div
      style={{
        display: toggle ? 'block' : 'none'
      }}
      className="file-list"
      ref={ref}
    ></div>
  )
}

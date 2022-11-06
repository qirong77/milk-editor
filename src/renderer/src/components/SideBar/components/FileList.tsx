import { basename, dirname, resolve } from 'path-browserify'
import { useEffect, useRef } from 'react'
import {
  DELETE_DIR,
  DELETE_FILE,
  NEW_DIR,
  NEW_FILE,
  OPEN_DIR,
  RENAME_FILE
} from '../../../../../common/eventType'
import { NEW_DIR_NAME, NEW_FILE_NAME } from '../../../../../main/electron/config/constant'

import { mapFileList, SHOW_INPUT } from '../hooks/mapFileList'
export const FileList = () => {
  const ref = useRef<HTMLDivElement>(null)
  const setFileList = async () => {
    const fileList = await window.api.onGetFileList()
    const fileNodes = mapFileList(fileList)
    ref.current!.innerHTML = ''
    ref.current?.appendChild(fileNodes)
  }
  // 渲染的时候就获取文件列表
  useEffect(() => {
    setFileList()
    ref.current?.addEventListener('input', (e) => {
      console.log(e)
    })
    window.api.onMain(OPEN_DIR, (_e, newFileTree) => {
      const fileNodes = mapFileList(newFileTree)
      ref.current!.innerHTML = ''
      ref.current?.appendChild(fileNodes)
    })
    window.api.onMain(RENAME_FILE, (e, path) => {
      const target = document.getElementById(path)
      console.log(target)
      console.log(path)
      if (target && !target.className.includes(SHOW_INPUT)) {
        target.classList.add(SHOW_INPUT)
      }
    })
    window.api.onMain(DELETE_FILE, (e, path) => {
      const target = document.getElementById(path)
      if (target) {
        target.parentElement?.removeChild(target)
      }
    })
    window.api.onMain(DELETE_DIR, (e, path) => {
      const ul = document.getElementById(path)?.parentElement
      ul?.parentElement?.removeChild(ul)
    })
    window.api.onMain(NEW_DIR, (_e, path, newPath) => {
      const target = document.getElementById(path)
      const level = target?.getAttribute('level')
      const node = mapFileList({
        fileName: NEW_DIR_NAME,
        level: Number(level) + 1,
        isDir: true,
        children: [],
        path: newPath
      })
      target?.parentElement?.appendChild(node)
    })
    window.api.onMain(NEW_FILE, (_e, path, newPath) => {
      const target = document.getElementById(path)
      const level = target?.getAttribute('level')

      const node = mapFileList({
        fileName: NEW_FILE_NAME,
        level: Number(level) + 1,
        isDir: false,
        children: [],
        path: newPath
      })
      target?.parentElement?.appendChild(node)
    })
  }, [])

  return <div className="file-list" ref={ref}></div>
}

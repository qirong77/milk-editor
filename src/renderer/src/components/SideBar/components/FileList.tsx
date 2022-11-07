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
import { NEW_DIR_NAME, NEW_FILE_NAME } from '../../../../../main/electron/config/constant'
import { openFile } from '../../../common/openFile'


import { mapFileList, SHOW_INPUT } from '../hooks/mapFileList'
export const FileList = ({ toggle, setToggle }) => {
  console.log('render-fileTree-component')
  const ref = useRef<HTMLDivElement>(null)
  const setFileList = async () => {
    console.log('setFileList')
    const fileTree = await window.api.onGetDirTree()
    const fileNodes = mapFileList(fileTree)
    ref.current!.innerHTML = ''
    ref.current?.appendChild(fileNodes)
  }
  // 暂时不设置打开文件后打开对应的大纲
  // 通过事件冒泡来通知需要更改显示状态
  // useEffect(() => {
  //   const hanldePropagation = (e: MouseEvent) => {
  //     e.stopPropagation()
  //     console.log('propagation in file-list-component')
  //     setToggle(!toggle)
  //   }
  //   ref.current?.addEventListener('click', hanldePropagation)
  //   return () => document.removeEventListener('click', hanldePropagation)
  // }, [toggle])
  // 渲染的时候就获取文件列表
  // 如果使用空数组依赖，组件渲染会导致重复监听
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
    window.api.onMain(RENAME_FILE, (_e, path) => {
      const target = document.getElementById(path)
      console.log(target)
      console.log(path)
      if (target && !target.className.includes(SHOW_INPUT)) {
        target.classList.add(SHOW_INPUT)
      }
    })
    window.api.onMain(DELETE_FILE, (_e, path) => {
      const target = document.getElementById(path)
      if (target) {
        target.parentElement?.removeChild(target)
      }
    })
    window.api.onMain(DELETE_DIR, (_e, path) => {
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
      openFile(newPath)
    })
  }, [])
  useEffect(() => {
    const handleContextMenu = async (e: MouseEvent) => {
      const fileTree = await window.api.onGetDirTree()
      const path = fileTree.path
      window.api.sendToMain(POP_ROOT_MENU, path)
    }
    ref.current?.addEventListener('contextmenu', handleContextMenu)
    return () => {
      ref.current?.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])
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

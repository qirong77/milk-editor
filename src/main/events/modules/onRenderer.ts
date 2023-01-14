import { dialog, ipcMain } from 'electron'
import { existsSync, lstatSync, mkdirSync,  unlinkSync, writeFileSync } from 'fs'
import { basename, resolve } from 'path'
import { move } from 'fs-extra'
import {
  GET_DIR_TREE,
  SAVE_FILE,
  UPDATE_DIR_TREE,
  POP_FILE_ITEM_MENU,
  DELETE,
  POP_FILE_DIR_MENU,
  CREATE_NEW,
  DRAG_FILE,
  UPDATE_HEADERS,
  NOTIFY_UPDATE_HEADERS
} from '../../../common/eventType'
import { defaultPath, DEFAULT_CONTENT, NEW_DIR_NAME, NEW_FILE_NAME } from '../../config'
import { createFilDirMenu } from '../../menu/modules/contextMenu/fileDir'
import { createFilItemMenu } from '../../menu/modules/contextMenu/fileItem'
import { deleteDir } from '../helper/deleteDir'
import { getDirectoryTree } from '../helper/getDirectoryTree'
const handleMenu = () => {
  ipcMain.on(POP_FILE_ITEM_MENU, () => {
    createFilItemMenu().popup()
  })
  ipcMain.on(POP_FILE_DIR_MENU, () => {
    createFilDirMenu().popup()
  })
}
export const onRenderer = () => {
  handleMenu()
  ipcMain.on(GET_DIR_TREE, (e) => {
    e.sender.send(UPDATE_DIR_TREE, ...getDirectoryTree(defaultPath))
  })
  ipcMain.on(SAVE_FILE, (_e, path: string, newContent: string) => {
    existsSync(path) && writeFileSync(path, newContent)
  })

  ipcMain.on(DELETE, (e, path) => {
    try {
      if (lstatSync(path).isDirectory()) deleteDir(path)
      else unlinkSync(path)
      e.sender.send(UPDATE_DIR_TREE, ...getDirectoryTree(defaultPath))
    } catch {
      throw new Error('删除文件出错')
    }
  })
  ipcMain.on(CREATE_NEW, (e, path, isDirectory) => {
    const newPath = isDirectory ? resolve(path, NEW_DIR_NAME) : resolve(path, NEW_FILE_NAME)
    if (existsSync(newPath)) {
      dialog.showMessageBoxSync({
        type: 'info',
        message: '文件已经存在'
      })
      return
    }
    if (isDirectory) mkdirSync(newPath)
    else writeFileSync(newPath, DEFAULT_CONTENT, 'utf-8')
    e.sender.send(UPDATE_DIR_TREE, ...getDirectoryTree(defaultPath), newPath)
  })
  ipcMain.on(DRAG_FILE, (e, target, desc) => {
    const newName = basename(target)
    const newPath = resolve(desc, newName)
    move(target, newPath)
      .then(() => {
        e.sender.send(UPDATE_DIR_TREE, ...getDirectoryTree(defaultPath))
      })
      .catch((error) => {
        console.log('📕', error)
        throw new Error('操作失败')
      })
  })
  ipcMain.on(NOTIFY_UPDATE_HEADERS,(e)=>{
    e.sender.send(UPDATE_HEADERS)
  })
}

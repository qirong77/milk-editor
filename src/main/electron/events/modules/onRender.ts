import { BrowserWindow, ipcMain } from 'electron'
import { existsSync, lstatSync, renameSync, unlinkSync, writeFileSync } from 'fs'
import { windowsMap } from '../../..'
import { deleteDir } from '../../../helper/deleteDir'
import {
  CLOSE_SCREEN,
  DELETE_FILE,
  DELETE_FILE_R,
  DRAG_FILE,
  MAX_SCREEN,
  MIN_SCREEN,
  OPEN_FILE,
  POP_DIR_MENU,
  POP_EDITOR_MENU,
  POP_FILE_ITEM_MENU,
  POP_ROOT_MENU,
  RENAME_FILE,
  RENAME_FILE_DONE,
  SAVE_FILE
} from '../../../../common/eventType'
import { getWindow } from '../../../helper/getWindow'
import { openFile } from '../../../helper/openFile'
import { createFilDirMenu } from '../../menu/modules/contextMenu/fileDir'
import { createFilItemMenu } from '../../menu/modules/contextMenu/fileItem'
import { createRotDirMenu } from '../../menu/modules/contextMenu/rootDir'
import { createEditorMenu } from '../../menu/modules/contextMenu/editor'

export const onRender = () => {
  ipcMain.on(MIN_SCREEN, () => BrowserWindow.getFocusedWindow()?.minimize())
  ipcMain.on(MAX_SCREEN, (e) => {
    const window = getWindow(e)
    if (window) {
      window.isMinimized() ? window.unmaximize() : window.maximize()
    }
  })
  ipcMain.on(CLOSE_SCREEN, (e) => {
    const window = getWindow(e)
    if (window) {
      window.close()
      windowsMap.delete(window)
    }
  })
  ipcMain.on(RENAME_FILE, (e, oldFilePath, newFilePath) => {
    // 这里有个bug，就说明明可以重新命名，但是会报错
    try {
      renameSync(oldFilePath, newFilePath)
      const currentWindow = getWindow(e)
      currentWindow?.webContents.send(RENAME_FILE_DONE, oldFilePath, newFilePath)
    } catch (error) {
      console.log('重新命名失败')
      console.log('oldFilePath:' + oldFilePath)
      console.log('newFilePath:' + newFilePath)
    }
  })
  ipcMain.on(OPEN_FILE, (_e, filePath: string) => {
    const window = BrowserWindow.getFocusedWindow()

    window && openFile(filePath, window)
  })
  ipcMain.on(POP_FILE_ITEM_MENU, (_e, path) => {
    const window = BrowserWindow.getFocusedWindow()
    const menu = createFilItemMenu(path)
    window && menu.popup({ window })
  })
  ipcMain.on(POP_DIR_MENU, (_e, path) => {
    const window = BrowserWindow.getFocusedWindow()
    window &&
      createFilDirMenu(path).popup({
        window
      })
  })
  ipcMain.on(POP_EDITOR_MENU, (_e, path) => {
    const window = BrowserWindow.getFocusedWindow()
    const menu = createEditorMenu(path)
    window &&
      menu.popup({
        window
      })
  })
  ipcMain.on(SAVE_FILE, (_e, filePath, newContent) => {
    if (existsSync(filePath)) {
      writeFileSync(filePath, newContent)
    } else {
      console.log('找不到该文件路径')
      console.log(filePath)
    }
  })
  ipcMain.on(POP_ROOT_MENU, (_e, path) => {
    const window = BrowserWindow.getFocusedWindow()
    window &&
      createRotDirMenu(path).popup({
        window
      })
  })
  // 在渲染进程中commend + delete删除文件
  ipcMain.on(DELETE_FILE_R, (_e, path: string) => {
    if (!existsSync(path)) {
      throw new Error('删除文件错误，文件不存在：' + path)
    }
    if (lstatSync(path).isDirectory()) deleteDir(path)
    else unlinkSync(path)
    const window = BrowserWindow.getFocusedWindow()
    window?.webContents.send(DELETE_FILE, path)
  })
  ipcMain.on(DRAG_FILE, (_e, target, dest) => {
    console.log('📕',target)
    console.log('📕',dest)
    // moveSync(target, dest, {
    //   overwrite: true
    // })
  })
}

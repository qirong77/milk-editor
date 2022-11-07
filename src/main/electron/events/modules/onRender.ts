import { BrowserWindow, ipcMain } from 'electron'
import { existsSync, renameSync,  writeFileSync } from 'fs'
import {
  CLOSE_SCREEN,
  MAX_SCREEN,
  MIN_SCREEN,
  OPEN_FILE,
  POP_DIR_MENU,
  POP_FILE_ITEM_MENU,
  POP_ROOT_MENU,
  RENAME_FILE,
  SAVE_FILE
} from '../../../../common/eventType'
import { openFile } from '../../../helper/openFile'
import { createFilDirMenu } from '../../menu/modules/contextMenu/fileDir'
import { createFilItemMenu } from '../../menu/modules/contextMenu/fileItem'
import { createRotDirMenu } from '../../menu/modules/contextMenu/rootDir'

export const onRender = () => {
  ipcMain.on(MIN_SCREEN, () => BrowserWindow.getFocusedWindow()?.minimize())
  ipcMain.on(MAX_SCREEN, () => {
    if (BrowserWindow.getFocusedWindow()?.isMaximized()) {
      BrowserWindow.getFocusedWindow()?.unmaximize()
    } else {
      BrowserWindow.getFocusedWindow()?.maximize()
    }
  })
  ipcMain.on(CLOSE_SCREEN, () => BrowserWindow.getFocusedWindow()?.close())
  ipcMain.on(RENAME_FILE, (_e, oldFilePath, newFilePath) => {
    // 这里有个bug，就说明明可以重新命名，但是会报错
    try {
      renameSync(oldFilePath, newFilePath)
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
    window && menu.popup({window})
  })
  ipcMain.on(POP_DIR_MENU, (_e, path) => {
    const window = BrowserWindow.getFocusedWindow()
    window &&
      createFilDirMenu(path).popup({
        window
      })
  })
  ipcMain.on(SAVE_FILE, (_e, filePath, newContent) => {
    existsSync(filePath) && writeFileSync(filePath, newContent)
  })
  ipcMain.on(POP_ROOT_MENU, (_e, path) => {
    const window = BrowserWindow.getFocusedWindow()
    window &&
      createRotDirMenu(path).popup({
        window
      })
  })
}

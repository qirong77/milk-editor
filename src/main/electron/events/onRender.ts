import { BrowserWindow, ipcMain } from 'electron'
import { existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { newFileListMenu } from '../menu/fileListMenu'
import {
  CLOSE_SCREEN,
  MAX_SCREEN,
  MIN_SCREEN,
  CLICK_FILE_LIST,
  UPDATE_FILE,
  NEW_FILE,
  POP_FILE_LIST_MENU
} from './constant'
import { defaultDirPath } from './onInterProcess'
import { openNewFile } from './onSendToRender'
let timer

export const onRender = (window: BrowserWindow) => {
  ipcMain.on(MIN_SCREEN, () => window.minimize())
  ipcMain.on(MAX_SCREEN, () => {
    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  })
  ipcMain.on(CLOSE_SCREEN, () => window.close())
  ipcMain.on(CLICK_FILE_LIST, (_e, filePath) => {
    openNewFile(filePath, window)
  })
  ipcMain.on(NEW_FILE, (e, fileName) => {
    const filePath = resolve(defaultDirPath, fileName + '.md')
    console.log(filePath)
    writeFileSync(filePath, 'new file')
    openNewFile(filePath, window)
  })
  ipcMain.on(UPDATE_FILE, (e, { filePath, newFileContent }) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('write file in' + filePath)
      if (existsSync(filePath)) writeFileSync(filePath, newFileContent)
    }, 3000)
  })
  ipcMain.on(POP_FILE_LIST_MENU, (e, filePath) => {
    newFileListMenu(filePath, window).popup({
      window
    })
  })
}

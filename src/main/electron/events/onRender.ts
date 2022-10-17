import { BrowserWindow, ipcMain } from 'electron'
import { writeFileSync } from 'fs'
import {
  CLOSE_SCREEN,
  MAX_SCREEN,
  MIN_SCREEN,
  CLICK_FILE_LIST,
  UPDATE_FILE
} from './constant'
import { openNewFile } from './onSendToRender'



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
  ipcMain.on(CLICK_FILE_LIST, (e, filePath) => {
    openNewFile(filePath, window)
  })
  ipcMain.on(UPDATE_FILE, (e, { filePath, newContent }) => {
    console.log('update file')
    writeFileSync(filePath, newContent)
  })
}


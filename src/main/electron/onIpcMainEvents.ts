import { BrowserWindow, ipcMain } from 'electron'
import {
  CLOSE_SCREEN,
  OPEN_DEFAULT_DIR,
  MAX_SCREEN,
  MIN_SCREEN,
  CLICK_FILE_LIST,
  UPDATE_FILE
} from '../constant'
import { getDefaultDirContents } from '../node/getDir'
import { openNewFile } from './utils'

export const onIpcMainEvents = (window: BrowserWindow) => {
  ipcMain.on(MIN_SCREEN, () => window.minimize())
  ipcMain.on(MAX_SCREEN, () => {
    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  })
  ipcMain.on(CLOSE_SCREEN, () => window.close())
  ipcMain.handle(OPEN_DEFAULT_DIR, getDefaultDirContents)
  ipcMain.on(CLICK_FILE_LIST, (e,filePath) => {
    openNewFile(filePath, window)
  })
  ipcMain.on(UPDATE_FILE,(e,{})=>{

  })
}

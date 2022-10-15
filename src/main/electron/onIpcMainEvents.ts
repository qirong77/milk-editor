import { BrowserWindow, ipcMain } from 'electron'
import { CLOSE_SCREEN, OPEN_DEFAULT_DIR, MAX_SCREEN, MIN_SCREEN } from '../constant'
import { getDefaultDirContents } from '../node/getDir'

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
  ipcMain.handle(OPEN_DEFAULT_DIR,getDefaultDirContents)
}
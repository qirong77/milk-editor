import { BrowserWindow, ipcMain } from 'electron'
import { existsSync, writeFileSync } from 'fs'
import { CLOSE_SCREEN, MAX_SCREEN, MIN_SCREEN, CLICK_FILE_LIST, UPDATE_FILE, NEW_FILE } from './constant'
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
  ipcMain.on(CLICK_FILE_LIST, (e, filePath) => {
    openNewFile(filePath, window)
  })
  ipcMain.on(NEW_FILE,(e,filePath)=>{
    writeFileSync(filePath,'')
  })
  ipcMain.on(UPDATE_FILE, (e, { filePath, newFileContent }) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('write file in' + filePath)
      if (existsSync(filePath)) writeFileSync(filePath, newFileContent)
    }, 3000)
  })
}

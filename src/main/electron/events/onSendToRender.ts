import { BrowserWindow } from 'electron'
import { readFileSync } from 'fs'
import { OPEN_NEW_FILE, UPDATE_FILE_LIST } from './constant'

export const openNewFile = (filePath: string, window: BrowserWindow) => {
  const fileContent = readFileSync(filePath, 'utf-8')
  window.webContents.send(OPEN_NEW_FILE, {
    filePath,
    fileContent
  })
}
export const updateFileList = (window: BrowserWindow) => {
  window.webContents.send(UPDATE_FILE_LIST)
}

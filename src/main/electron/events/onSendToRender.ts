import { BrowserWindow } from 'electron'
import { readFileSync } from 'fs'
import { OPEN_NEW_FILE } from './constant'

export const openNewFile = (filePath: string, window: BrowserWindow) => {
  const fileContent = readFileSync(filePath, 'utf-8')
  window.webContents.send(OPEN_NEW_FILE, {
    filePath,
    fileContent
  })
}

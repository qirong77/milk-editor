import { BrowserWindow, WebContents } from 'electron'
import { readFileSync } from 'fs'
import { basename } from 'path'
import { OPEN_FILE } from '../../common/eventType'

export const openFile = (filePath: string, window: BrowserWindow) => {
  const fileContent = readFileSync(filePath, 'utf-8')
  window.webContents.send(OPEN_FILE, {
    filePath,
    fileContent,
    fileName: basename(filePath)
  })
}

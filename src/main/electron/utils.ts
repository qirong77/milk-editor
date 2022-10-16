import { BrowserWindow, dialog } from "electron"
import { readFileSync } from "fs"
import { OPEN_NEW_FILE } from "../constant"

export async function openFileSelector(window: BrowserWindow) {
    const { canceled, filePaths } = await dialog.showOpenDialog(window)
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  }
export const openNewFile = (filePath: string, window: BrowserWindow) => {
    const fileContent = readFileSync(filePath, 'utf-8')
    window.webContents.send(OPEN_NEW_FILE, {
      filePath,
      fileContent
    })
  }
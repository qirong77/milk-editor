import { BrowserWindow, dialog } from 'electron'
import { readFileSync } from 'fs'

export async function openFileSelector(window: BrowserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(window)
  if (canceled) {
    return
  } else {
    return filePaths
  }
}
export const readFile = (path = '') => {
  const content = readFileSync(path, 'utf-8')
  return content
}

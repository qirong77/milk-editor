import { BrowserWindow, dialog } from 'electron'

export async function openFileDialog(window: BrowserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(window)
  if (canceled) {
    return ''
  } else {
    return filePaths[0]
  }
}

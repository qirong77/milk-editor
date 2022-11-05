import { BrowserWindow, dialog } from 'electron'

export async function openDialog(window: BrowserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(window)
  if (canceled) {
    return ''
  } else {
    return filePaths
  }
}

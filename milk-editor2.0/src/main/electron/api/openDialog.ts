import { BrowserWindow, dialog } from 'electron'

export async function openDialog(window: BrowserWindow, options?: Electron.OpenDialogOptions) {
  const { canceled, filePaths } = await dialog.showOpenDialog(window, options || {})
  if (canceled) {
    return ''
  } else {
    return filePaths[0]
  }
}

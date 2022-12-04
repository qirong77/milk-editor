import { ipcMain } from 'electron'
import { existsSync, readFileSync } from 'fs'
import { basename } from 'path'
import { GET_FILE_CONTENT } from '../../../common/eventType'
import { getWindow } from '../helper/getWindow'

export const onInterProcess = () => {
  ipcMain.handle(GET_FILE_CONTENT, (e, path: string) => {
    const window = getWindow(e)
    window?.setTitle(basename(path))
    if (existsSync(path)) {
      return readFileSync(path, 'utf-8')
    } else return 'error path: ' + path
  })
}

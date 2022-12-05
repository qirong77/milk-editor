import { ipcMain } from 'electron'
import { existsSync, readFileSync } from 'fs'
import { GET_FILE_CONTENT } from '../../../common/eventType'

export const onInterProcess = () => {
  ipcMain.handle(GET_FILE_CONTENT, (e, path: string) => {
    if (existsSync(path)) {
      return readFileSync(path, 'utf-8')
    } else return 'error path: ' + path
  })
}

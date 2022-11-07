import { BrowserWindow, ipcMain } from 'electron'
import { windowsMap } from '../../..'
import { GET_DIR_TREE, GET_FILE_LIST } from '../../../../common/eventType'
import { getDirectoryTree } from '../../../helper/getDirectoryTree'
import { getFileList } from '../../../helper/getFileList'
import { getWindow } from '../../../helper/getWindow'
import { defaultPath } from '../../config'

export const onInterProcess = () => {
  ipcMain.handle(GET_DIR_TREE, (e) => {
    const window = getWindow(e)
    const path = windowsMap.get(window as BrowserWindow)
    return getDirectoryTree(path || defaultPath)
  })
  ipcMain.handle(GET_FILE_LIST, (e) => {
    const window = getWindow(e)
    const path = windowsMap.get(window as BrowserWindow)

    return getFileList(path || defaultPath)
  })
}

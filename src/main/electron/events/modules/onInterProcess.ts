import { ipcMain } from 'electron'
import { GET_DIR_TREE, GET_FILE_LIST } from '../../../../common/eventType'
import { getDirectoryTree } from '../../../helper/getDirectoryTree'
import { getFileList } from '../../../helper/getFileList'

export const onInterProcess = (openedDir: string) => {
  ipcMain.handle(GET_DIR_TREE, () => {
    return getDirectoryTree(openedDir)
  })
  ipcMain.handle(GET_FILE_LIST, () => {
    return getFileList(openedDir)
  })
}

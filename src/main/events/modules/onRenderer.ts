import { ipcMain } from 'electron'
import { GET_DIR_TREE, UPDATE_DIR_TREE } from '../../../common/eventType'
import { defaultPath } from '../../config'
import { getDirectoryTree } from '../helper/getDirectoryTree'
import { getWindow } from '../helper/getWindow'
export const onRenderer = () => {
  ipcMain.on(GET_DIR_TREE, (e) => {
    const window = getWindow(e)
    console.log('📕',window)
    console.log('📕',GET_DIR_TREE)
    window?.webContents.send(UPDATE_DIR_TREE, getDirectoryTree(defaultPath))
  })
}

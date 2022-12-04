import { ipcMain } from 'electron'
import { existsSync, writeFile, writeFileSync } from 'fs'

import { GET_DIR_TREE, SAVE_FILE, UPDATE_DIR_TREE } from '../../../common/eventType'
import { defaultPath } from '../../config'
import { getDirectoryTree } from '../helper/getDirectoryTree'
import { getWindow } from '../helper/getWindow'
export const onRenderer = () => {
  ipcMain.on(GET_DIR_TREE, (e) => {
    const window = getWindow(e)
    console.log('📕', window)
    console.log('📕', GET_DIR_TREE)
    window?.webContents.send(UPDATE_DIR_TREE, getDirectoryTree(defaultPath))
  })
  ipcMain.on(SAVE_FILE, (_e, path: string, newContent: string) => {
    existsSync(path) && writeFileSync(path, newContent)
  })
}

import { ipcMain } from 'electron'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'

import { GET_DIR_TREE, SAVE_FILE, UPDATE_DIR_TREE, RENAME_FILE } from '../../../common/eventType'
import { defaultPath } from '../../config'
import { getDirectoryTree } from '../helper/getDirectoryTree'
export const onRenderer = () => {
  ipcMain.on(GET_DIR_TREE, (e) => {
    e.sender.send(UPDATE_DIR_TREE, ...getDirectoryTree(defaultPath))
  })
  ipcMain.on(SAVE_FILE, (_e, path: string, newContent: string) => {
    existsSync(path) && writeFileSync(path, newContent)
  })
  ipcMain.on(RENAME_FILE, (e, beforPath, newName) => {
    if (existsSync(beforPath)) throw new Error('未找到文件')
    // 先用write，后面用rename
    const dir = dirname(beforPath)
    const newPath = resolve(dir, newName)
    console.log('📕',newPath)
    writeFileSync(newPath, readFileSync(beforPath, 'utf-8'))
    unlinkSync(beforPath)
    e.sender.send(UPDATE_DIR_TREE, getDirectoryTree(defaultPath))
  })
}

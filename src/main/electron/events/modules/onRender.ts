import { BrowserWindow, ipcMain } from 'electron'
import { existsSync, renameSync } from 'fs'
import { dirname, resolve } from 'path'
import {
  CLOSE_SCREEN,
  MAX_SCREEN,
  MIN_SCREEN,
  OPEN_FILE,
  POP_FILE_ITEM_MENU,
  RENAME_FILE
} from '../../../../common/eventType'
import { openFile } from '../../../helper/openFile'
import { createFilItemMenu } from '../../menu/modules/contextMenu/fileItem'

export const onRender = (window: BrowserWindow) => {
  ipcMain.on(MIN_SCREEN, () => window.minimize())
  ipcMain.on(MAX_SCREEN, () => {
    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  })
  ipcMain.on(CLOSE_SCREEN, () => window.close())
  ipcMain.on(RENAME_FILE, (_e, oldFilePath, newFileName) => {
    const newFilePath = resolve(dirname(oldFilePath), newFileName + '.md')
    if (existsSync(oldFilePath) && existsSync(newFilePath)) {
      renameSync(oldFilePath, newFilePath)
    }
  })
  ipcMain.on(OPEN_FILE, (_e, filePath: string) => {
    openFile(filePath, window)
  })
  ipcMain.on(POP_FILE_ITEM_MENU,(_e,filePath:string)=>{
    createFilItemMenu(filePath).popup({
      window
    })
  })
}

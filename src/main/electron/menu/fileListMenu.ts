import { BrowserWindow, Menu } from 'electron'
import { existsSync, unlinkSync } from 'fs'
import { DarwinMenuItemConstructorOptions } from '.'
import { updateFileList } from '../events/onSendToRender'

export const newFileListMenu = (filePath: string, window: BrowserWindow) => {
  const fileListMenuTemplate: DarwinMenuItemConstructorOptions = {
    label: '删除',
    click: () => {
      if (existsSync(filePath)) unlinkSync(filePath)
      updateFileList(window)
    }
  }
  return Menu.buildFromTemplate([fileListMenuTemplate])
}

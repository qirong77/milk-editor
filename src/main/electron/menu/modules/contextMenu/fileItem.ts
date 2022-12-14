import { Menu } from 'electron'
import { existsSync, unlinkSync } from 'fs'
import { DarwinMenuItemConstructorOptions } from '../..'
import { DELETE_FILE, RENAME_FILE } from '../../../../../common/eventType'

export const createFilItemMenu = (path: string) => {
  const template: DarwinMenuItemConstructorOptions[] = [
    {
      label: '重命名',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(RENAME_FILE, path)
      }
    },
    {
      label: '删除',
      click(_menuItem, browserWindow, _event) {
        existsSync(path) && unlinkSync(path)
        browserWindow?.webContents.send(DELETE_FILE, path)
      }
    }
  ]
  return Menu.buildFromTemplate(template)
}

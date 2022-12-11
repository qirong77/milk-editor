import { Menu } from 'electron'
import { DarwinMenuItemConstructorOptions } from '../..'
import { MENU_DELETE, MENU_RENAME_FILE } from '../../../../common/eventType'

export const createFilItemMenu = () => {
  const template: DarwinMenuItemConstructorOptions[] = [
    {
      label: '重命名',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(MENU_RENAME_FILE)
      }
    },
    {
      label: '删除',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(MENU_DELETE)
      }
    }
  ]
  return Menu.buildFromTemplate(template)
}

import { Menu } from 'electron'
import { DarwinMenuItemConstructorOptions } from '../..'
import { MENU_NEW_DIR, MENU_NEW_FILE, MENU_RENAME_FILE } from '../../../../common/eventType'

export const createFilDirMenu = () => {
  const template: DarwinMenuItemConstructorOptions[] = [
    {
      label: '新建文件',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(MENU_NEW_FILE)
      }
    },
    {
      label: '新建文件夹',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(MENU_NEW_DIR)
      }
    },
    {
      label: '在finder中显示',
      click(_menuItem, _browserWindow, _event) {}
    }, 
    {
      label: '重命名',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(MENU_RENAME_FILE)
      }
    },
    {
      label: '删除文件夹',
      click(_menuItem, _browserWindow, _event) {
      }
    }
  ]
  return Menu.buildFromTemplate(template)
}

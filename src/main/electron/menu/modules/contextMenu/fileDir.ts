import { Menu } from 'electron'
import { existsSync, mkdirSync,  writeFileSync } from 'fs'
import { resolve } from 'path'
import { DarwinMenuItemConstructorOptions } from '../..'
import { DELETE_DIR, NEW_DIR, NEW_FILE, RENAME_FILE } from '../../../../../common/eventType'
import { deleteDir } from '../../../../helper/deleteDir'
import { NEW_DIR_NAME, NEW_FILE_NAME } from '../../../config/constant'

export const createFilDirMenu = (path: string) => {
  const template: DarwinMenuItemConstructorOptions[] = [
    {
      label: '新建文件',
      click(_menuItem, browserWindow, _event) {
        const newPath = resolve(path, NEW_FILE_NAME)
        if (!existsSync(newPath)) {
          writeFileSync(newPath, '空内容')
          browserWindow?.webContents.send(NEW_FILE, path, newPath)
        } else {
          console.log('文件已经存在')
          console.log(newPath)
        }
      }
    },
    {
      label: '新建文件夹',
      click(_menuItem, browserWindow, _event) {
        const newPath = resolve(path, NEW_DIR_NAME)
        if (!existsSync(newPath)) {
          mkdirSync(newPath)
          browserWindow?.webContents.send(NEW_DIR, path, newPath)
        } else {
          console.log(newPath)
          console.log('文件夹已存在')
        }
      }
    },
    {
      label: '在finder中显示',
      click(_menuItem, _browserWindow, _event) {}
    },
    {
      label: '重命名',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(RENAME_FILE, path)
      }
    },
    {
      label: '删除文件夹',
      click(_menuItem, browserWindow, _event) {
        deleteDir(path)
        browserWindow?.webContents.send(DELETE_DIR, path)
      }
    },

    {
      label: 'API-TEXT',
      click(_menuItem, _browserWindow, _event) {}
    }
  ]
  return Menu.buildFromTemplate(template)
}

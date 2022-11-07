import { Menu } from 'electron'
import { existsSync, mkdirSync,  writeFileSync } from 'fs'
import { resolve } from 'path'
import { DarwinMenuItemConstructorOptions } from '../..'
import { NEW_DIR, NEW_FILE } from '../../../../../common/eventType'
import { NEW_DIR_NAME, NEW_FILE_NAME } from '../../../config/constant'

export const createRotDirMenu = (path: string) => {
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
  ]
  return Menu.buildFromTemplate(template)
}

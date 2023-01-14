import { DarwinMenuItemConstructorOptions } from '../..'
import {  windowsMap } from '../../../..'
import { openFile } from '../../../../helper/openFile'
import { createWindow } from '../../../api/createwindow'
import { openDialog } from '../../../api/openDialog'

export const fileMenuTemplate: DarwinMenuItemConstructorOptions = {
  label: '文件',
  submenu: [
    {
      label: '新建',
      click: () => {}
    },
    {
      label: '打开',
      async click(_menuItem, browserWindow, _event) {
        if (browserWindow) {
          const path = await openDialog(browserWindow, {
            filters: [
              {
                name: 'markdown',
                extensions: ['md']
              }
            ],
            properties: ['openFile']
          })
          path && openFile(path, browserWindow)
        }
      }
    },
    {
      label: '打开文件夹',
      async click(_menuItem, browserWindow, _event) {
        if (browserWindow) {
          const path = await openDialog(browserWindow, {
            properties: ['openDirectory']
          })
          // path[0] && openFile(path[0], browserWindow)
          path &&
            createWindow({
              openedDir: path,
              windowsMap
            })
        }
      }
    }
  ]
}

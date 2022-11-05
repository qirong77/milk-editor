import { BrowserWindow } from 'electron'
import { openFile } from '../../../helper/openFile'

import { DarwinMenuItemConstructorOptions } from '../../../interface'
import { openDialog } from '../../api/openDialog'

export const fileMenuTemplate = (window: BrowserWindow): DarwinMenuItemConstructorOptions => {
  return {
    label: '文件',
    submenu: [
      {
        label: '新建',
        click: () => {}
      },
      {
        label: '打开',
        click: async () => {
          const path = await openDialog(window)
          path[0] && openFile(path[0], window)
        }
      }
    ]
  }
}

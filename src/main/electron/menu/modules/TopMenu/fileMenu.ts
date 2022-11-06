import { DarwinMenuItemConstructorOptions } from '../..'
import { OPEN_DIR } from '../../../../../common/eventType'
import { getDirectoryTree } from '../../../../helper/getDirectoryTree'
import { openFile } from '../../../../helper/openFile'
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
      async click(menuItem, browserWindow, event) {
        if (browserWindow) {
          const path = await openDialog(browserWindow, {
            properties: ['openDirectory']
          })
          // path[0] && openFile(path[0], browserWindow)
          console.log(path[0])
          // const newDirTree = getDirectoryTree(path[0])
          // browserWindow.webContents.send(OPEN_DIR, newDirTree)
        }
      }
    }
  ]
}

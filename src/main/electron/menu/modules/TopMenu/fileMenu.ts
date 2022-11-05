
import { openFile } from '../../../../helper/openFile'
import { openDialog } from '../../../api/openDialog'

export const fileMenuTemplate = {
    label: '文件',
    submenu: [
      {
        label: '新建',
        click: () => {}
      },
      {
        label: '打开',
        async click(_menuItem, browserWindow, _event) {
          if(browserWindow) {
            const path = await openDialog(browserWindow)
            path[0] && openFile(path[0], browserWindow)
          }
        }
      }
    ]
  
}

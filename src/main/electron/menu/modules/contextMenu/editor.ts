import { Menu } from 'electron'
import { DarwinMenuItemConstructorOptions } from '../..'
import { TRANSLATION } from '../../../../../common/eventType'

export const createEditorMenu = (path: string) => {
  const template: DarwinMenuItemConstructorOptions[] = [
    {
      label: '翻译',
      click(_menuItem, browserWindow, _event) {
        browserWindow?.webContents.send(TRANSLATION)
      }
    },
  ]
  return Menu.buildFromTemplate(template)
}

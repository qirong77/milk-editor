import { Menu } from 'electron'
import { existsSync, unlinkSync } from 'fs'
import { DarwinMenuItemConstructorOptions } from '../..'

export const createFilItemMenu = (path: string) => {
  const template: DarwinMenuItemConstructorOptions[] = [
    {
      label: '重命名',
      click(menuItem, browserWindow, event) {
        console.log(menuItem)
        console.log(browserWindow)
      }
    },
    {
      label: '删除',
      click(menuItem, browserWindow, event) {
        // existsSync(path) && unlinkSync(path)
      }
    }
  ]
  return Menu.buildFromTemplate(template)
}

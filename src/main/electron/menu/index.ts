import { Menu, MenuItemConstructorOptions } from 'electron'

import { editMenuTemplate } from './modules/TopMenu/editMenu'
import { fileMenuTemplate } from './modules/TopMenu/fileMenu'

export interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string
  submenu?: DarwinMenuItemConstructorOptions[] | Menu
}
export const createMenu = () => {
  const template: DarwinMenuItemConstructorOptions[] = [fileMenuTemplate, editMenuTemplate]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

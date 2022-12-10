import { Menu, MenuItemConstructorOptions } from 'electron'
import { appMenuTemplate } from './modules/TopMenu/appMenu'

import { editMenuTemplate } from './modules/TopMenu/editMenu'
import { fileMenuTemplate } from './modules/TopMenu/fileMenu'
import { helpMenuTemplate } from './modules/TopMenu/helpMenu'
import { viewMenuTemplate } from './modules/TopMenu/viewMenu'

export interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string
  submenu?: DarwinMenuItemConstructorOptions[] | Menu
}
export const createMainMenu = () => {
  const template: DarwinMenuItemConstructorOptions[] = [
    appMenuTemplate,
    fileMenuTemplate,
    editMenuTemplate,
    viewMenuTemplate,
    helpMenuTemplate
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

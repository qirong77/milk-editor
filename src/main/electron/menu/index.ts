import { BrowserWindow, Menu } from 'electron'
import { DarwinMenuItemConstructorOptions } from '../../interface'
import { editMenuTemplate } from './modules/TopMenu/editMenu'
import { fileMenuTemplate } from './modules/fileMenu'

export const createMenu = (window: BrowserWindow) => {
  const template: DarwinMenuItemConstructorOptions[] = [fileMenuTemplate(window), editMenuTemplate]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

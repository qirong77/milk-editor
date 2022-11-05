import { Menu, MenuItemConstructorOptions } from 'electron'


// darwin就是mac系统的菜单类型
export interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string
  submenu?: DarwinMenuItemConstructorOptions[] | Menu
}

import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import { openFileDialog } from '../api/dialog'
import { openNewFile } from '../events/onSendToRender'

/* 
快捷键无法使用问题：https://github.com/moose-team/friends/issues/123
快捷键类型：https://juejin.cn/post/7116906625964720159#comment
*/

export const clickOpenFile = async (window: BrowserWindow) => {
  const path = await openFileDialog(window)
  path && openNewFile(path, window)
}

export interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string
  submenu?: DarwinMenuItemConstructorOptions[] | Menu
}

export const useMenu = (window: BrowserWindow) => {
  const defaultMenuTemplate = {
    label: app.name,
    submenu: [
      {
        label: '新建',
        click: () => {}
      }
    ]
  }
  const fileMenuTemplate: DarwinMenuItemConstructorOptions = {
    label: '文件',
    submenu: [
      {
        label: '新建',
        click: () => {}
      },
      {
        label: '打开',
        click: () => {
          clickOpenFile(window)
        }
      }
    ]
  }
  const editMenuTemplate: DarwinMenuItemConstructorOptions = {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }
    ]
  }
  const viewMenuTemplate: DarwinMenuItemConstructorOptions = {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        //刷新页面
        click: () => {
          // this.mainWindow.webContents.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        //全屏
        click: () => {
          // this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        //打开开发工具
        click: () => {
          // this.mainWindow.webContents.toggleDevTools();
        }
      }
    ]
  }
  const helpMenuTemplate: DarwinMenuItemConstructorOptions = {
    label: 'Help',
    submenu: [
      {
        label: '&设置',
        accelerator: 'Ctrl+S',
        click: () => {
          // createSettingWindow()
        }
      },
      {
        label: 'Learn More',
        click() {
          // shell.openExternal('https://electronjs.org');
        }
      },
      {
        label: '切换开发人员工具',
        click: () => {
          window.webContents.toggleDevTools()
        }
      }
    ]
  }
  const template: DarwinMenuItemConstructorOptions[] = [
    defaultMenuTemplate,
    fileMenuTemplate,
    editMenuTemplate,
    viewMenuTemplate,
    helpMenuTemplate
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

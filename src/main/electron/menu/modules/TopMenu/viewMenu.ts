import { DarwinMenuItemConstructorOptions } from '../..'

export const viewMenuTemplate: DarwinMenuItemConstructorOptions = {
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

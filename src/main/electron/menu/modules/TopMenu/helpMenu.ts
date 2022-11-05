import { DarwinMenuItemConstructorOptions } from '../../../interface'

export const helpMenuTemplate: DarwinMenuItemConstructorOptions = {
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
        //   window.webContents.toggleDevTools()
      }
    }
  ]
}

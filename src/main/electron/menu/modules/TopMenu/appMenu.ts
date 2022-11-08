import { DarwinMenuItemConstructorOptions } from '../..'

export const appMenuTemplate: DarwinMenuItemConstructorOptions = {
  label: 'appname',
  submenu: [
    {
      label: '关于'
    },
    {
      label: '检查更新'
    },
    {
      label: '偏好设置'
    },
    {
      label: '隐藏'
    },
    {
      label: '隐藏其他'
    },
    {
      label: '退出'
    },
    {
      label: '参考vscode的标题栏'
    }
  ]
}

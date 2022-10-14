import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron'
import { readFileSync } from 'fs'
import { OPEN_NEW_FILE } from '../constant'
import { openFileSelector } from './openFileDialog'

/* 
快捷键无法使用问题：https://github.com/moose-team/friends/issues/123
快捷键类型：https://juejin.cn/post/7116906625964720159#comment
*/
const openFile = async (window: BrowserWindow) => {
  const paths = await openFileSelector(window)
  if (paths) {
    const filePath = paths[0]
    const fileContent = readFileSync(filePath, 'utf-8')
    window.webContents.send(OPEN_NEW_FILE, {
      filePath,
      fileContent
    })
  }
}
interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string
  submenu?: DarwinMenuItemConstructorOptions[] | Menu
}

export const useMenu = (window: BrowserWindow) => {
  const defaultMenuTemplate = {
    label:app.name,
    submenu:[
      {
        label:'新建',
        click:()=>{}
      },
    ]
  }
  const fileMenuTemplate:DarwinMenuItemConstructorOptions = {
    label:'文件',
    submenu:[
      {
        label:'新建',
        click:()=>{}
      },
      {
        label:'打开',
        click:()=>{openFile(window)}
      }
    ]
  }
  const aboutMenuTemplate: DarwinMenuItemConstructorOptions = {
    label: 'About',
    submenu: [
      //下一层子菜单
      { label: 'Services' },
      //分割线
      { type: 'separator' },
      { label: 'Show All', selector: 'unhideAllApplications:' },
      {
        label: 'Quit',
        //快捷键
        accelerator: 'Command+Q',
        //点击事件
        click: () => {
          app.quit()
        }
      }
    ]
  }
  const editMenuTemplate: DarwinMenuItemConstructorOptions = {
    label: 'Edit',
    submenu: [
      { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
      {
        label: 'new BrowserWindow',
        click: () => {}
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
      }
    ]
  }
  const template: DarwinMenuItemConstructorOptions[] = [
    defaultMenuTemplate,
    fileMenuTemplate,
    aboutMenuTemplate,
    editMenuTemplate,
    viewMenuTemplate,
    helpMenuTemplate
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

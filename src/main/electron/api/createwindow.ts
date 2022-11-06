import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import path from 'path'
import { onEvents } from '../events'
import { createMenu } from '../menu'

export const createWindow = (config:{
  openedDir:string
}) => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    // 关闭默认的上面那栏
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
   createMenu(mainWindow)
  // 官方是在createWindow的位置事件监听,但是双向监听他又放在whenReady里面，后面在看看
  onEvents(mainWindow,config.openedDir)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 判断是加载什么，开发模式就是加载vite的地址
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import path from 'path'
import { WindowsMap } from '../../../common/interface'
interface config {
  openedDir: string
  windowsMap: WindowsMap
}
export const createWindow = ({ openedDir, windowsMap }: config) => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    // 关闭默认的上面那栏
    frame: false,
    autoHideMenuBar: true,
    x: 120 + windowsMap.size * 20,
    y: -25 + windowsMap.size * 20,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  windowsMap.set(mainWindow, openedDir)
  // 官方是在createWindow的位置事件监听,但是双向监听他又放在whenReady里面，后面在看看
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
  return mainWindow
}

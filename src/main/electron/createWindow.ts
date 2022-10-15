import { is } from "@electron-toolkit/utils"
import { BrowserWindow, shell } from "electron"
import path from "path"
import { onIpcMainEvents } from "./onIpcMainEvents"
import { useMenu } from "./useMenu"

export const createWindow = () =>{
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        // 关闭默认的上面那栏
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
          preload: path.join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      })
      useMenu(mainWindow)
      // 官方是在createWindow的位置事件监听,但是双向监听他又放在whenReady里面，后面在看看
      onIpcMainEvents(mainWindow)
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
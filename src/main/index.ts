import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './electron/api/createwindow'
import { defaultPath } from './electron/config'
import { onEvents } from './electron/events'
import { createMainMenu } from './electron/menu'
// createWindow后在window实例上面赋值无效，自能自己先用这种hack的方法用着，主要用于onInterProcess传递打开的文件路径
export const windowsMap = new Map<BrowserWindow, string>()
// electron初始化，可以创建窗口
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow({
    openedDir: defaultPath,
    windowsMap
  })
// 主菜单只需要渲染一次，ipcmain的事件也只能监听一次
  createMainMenu()
  onEvents()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow({
        openedDir: defaultPath,
        windowsMap
      })
  })
})

app.on('window-all-closed', () => {
  // mac的plateform是darwin
  if (process.platform !== 'darwin') {
    app.quit()
  } else {
    app.quit()
  }
})

import { app, shell, BrowserWindow, ipcMain, Menu} from 'electron'
import * as path from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { CLOSE_SCREEN, MAX_SCREEN, MIN_SCREEN, UPDATE_CONTENT } from './constant'
import { openFileSelector } from './utils'
import { readFileSync } from 'fs'
const openFile = async (window:BrowserWindow) =>{
  const paths = await openFileSelector(window)
  if(paths) {
    const path = paths[0]
    const content = readFileSync(path,'utf-8')
    window.webContents.send(UPDATE_CONTENT,content)
  } 
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    // 关闭默认的上面那栏
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png')
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => {},
          label: 'Increment'
        },
        {
          click: () => {},
          label: 'Decrement'
        }
      ]
    },
    {
      label: '文件',
      submenu: [
        {
          click: () => {},
          label: '新建',
          accelerator: 'Shift+CmdOrCtrl+H'
        },
        {
          click: () => {},
          label: '新建标签页',
          accelerator: 'Shift+CmdOrCtrl+H'
        },
        {
          label: '打开',
          click: ()=>{openFile(mainWindow)}
        }
      ]
    },
    {
      label: app.name,
      submenu: [
        {
          click: () => {},
          label: 'Increment'
        },
        {
          click: () => {},
          label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
    ipcMain.on(MIN_SCREEN, () => window.minimize())
    ipcMain.on(MAX_SCREEN, () => {
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    })
    ipcMain.on(CLOSE_SCREEN, () => window.close())
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

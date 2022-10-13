import { app, BrowserWindow, Menu } from "electron"
import { readFileSync } from "fs"
import { UPDATE_CONTENT } from "./constant"
import { openFileSelector } from "./openFile"
const openFile = async (window:BrowserWindow) =>{
    const paths = await openFileSelector(window)
    if(paths) {
      const path = paths[0]
      const content = readFileSync(path,'utf-8')
      window.webContents.send(UPDATE_CONTENT,content)
    } 
  }
export const useMenu = (window:BrowserWindow) => {
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
              click: ()=>{openFile(window)}
            }
          ]
        },
        {
          label: '显示',
          submenu: [
            {
              click: () => {},
              label: '侧边栏'
            },
            {
              click: () => {},
              label: '工具栏'
            }
          ]
        }
      ])
      Menu.setApplicationMenu(menu)
}
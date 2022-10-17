import { homedir } from 'os'
import { existsSync, readdirSync} from 'fs'
import { resolve } from 'path'
import { BrowserWindow, ipcMain } from "electron";
import { OPEN_DEFAULT_DIR } from "./constant";
const defultDirContent = () =>{
    const desktopDir = resolve(homedir(), 'Desktop')
    const defaultDirPath = resolve(desktopDir, 'front-end-book', 'Markdowns')
    if (existsSync(defaultDirPath)) {
      const IS_MARKDOWN = /\.md$/
      const markdownFiles = readdirSync(defaultDirPath).filter((path) => {
        if (IS_MARKDOWN.test(path)) return path
        else return false
      })
      const contents = markdownFiles.map((file) => {
        const filePath = resolve(defaultDirPath, file)
        return {
          fileName: file,
          filePath:filePath
        }
      })
      return contents
    } else {
      return resolve(homedir())
    }
}
export const onInterProcess = (window:BrowserWindow) =>{
    ipcMain.handle(OPEN_DEFAULT_DIR,defultDirContent)
}
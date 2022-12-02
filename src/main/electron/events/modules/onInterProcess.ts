import { BrowserWindow, ipcMain } from 'electron'
import { lstatSync, readdirSync, readFileSync } from 'fs'
import { basename, resolve } from 'path'
import { windowsMap } from '../../..'
import { GET_DIR_TREE, GET_FILE_LIST, GET_SEARCH_RESUlT } from '../../../../common/eventType'
import { SearchWords } from '../../../../common/types'
import { getDirectoryTree } from '../../../helper/getDirectoryTree'
import { getFileList } from '../../../helper/getFileList'
import { getWindow } from '../../../helper/getWindow'
import { defaultPath } from '../../config'
import { EXCEPT_FILE } from '../../config/constant'

export const onInterProcess = () => {
  ipcMain.handle(GET_DIR_TREE, (e) => {
    const window = getWindow(e)
    const path = windowsMap.get(window as BrowserWindow)
    const tree = getDirectoryTree(path || defaultPath)
    return tree
  })
  ipcMain.handle(GET_FILE_LIST, (e) => {
    const window = getWindow(e)
    const path = windowsMap.get(window as BrowserWindow)
    return getFileList(path || defaultPath)
  })
  ipcMain.handle(GET_SEARCH_RESUlT, (e, targetWord: string) => {
    const window = getWindow(e)
    const path = windowsMap.get(window as BrowserWindow)
    const matchs: SearchWords = []
    // 忽略大小写
    const regex = new RegExp(targetWord,'i')
    const notFind:SearchWords = [{
      fileName:'未找到结果',
      path:'',
      matchs:[]
    }]
    if(!targetWord) return notFind
    const dfs = (searchPath: string) => {
      if (lstatSync(searchPath).isDirectory()) {
        const fileNames = readdirSync(searchPath)
        fileNames.forEach((fileName) => {
          const nextPath = resolve(searchPath, fileName)
          if (!EXCEPT_FILE.test(nextPath)) dfs(nextPath)
        })
      } else {
        const node = {
          fileName: basename(searchPath),
          path: searchPath,
          matchs: []
        }
        const lines = readFileSync(searchPath, 'utf-8').split('\n')
        lines.forEach((line) => {
          if (regex.test(line)) {
            node.matchs.push(line)
          }
        })
        if (node.matchs.length > 1) matchs.push(node)
      }
    }
    dfs(path as string)
    if(matchs.length === 0 ) return notFind
    else return matchs
  })
}

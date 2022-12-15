import { ipcMain } from 'electron'
import { existsSync, lstatSync, readFileSync, readdirSync } from 'fs'
import { basename, resolve } from 'path'
import {  GET_FILE_CONTENT, GET_SEARCH_RESULT } from '../../../common/eventType'
import { SearchWords } from '../../../common/types'
import { defaultPath, EXCEPT_FILE } from '../../config'

export const onInterProcess = () => {
  ipcMain.handle(GET_FILE_CONTENT, (_e, path: string) => {
    if (existsSync(path)) {
      return readFileSync(path, 'utf-8')
    } else return 'error path: ' + path
  })
  ipcMain.handle(GET_SEARCH_RESULT, (_e, word: string) => {
    const regex = new RegExp(word, 'ig')
    const notFind: SearchWords[] = [
      {
        fileName: '未找到结果',
        path: '',
        matchs: [
          {
            line: 'not-found',
            index: 0
          }
        ]
      }
    ]
    const collections: SearchWords[] = []
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
        } as any
        let index = 0
        // 这个也无法保证替换之后是保持大小写
        const lines = readFileSync(searchPath, 'utf-8').split('\n')
        lines.forEach((line) => {
          if (regex.test(line)) {
            node.matchs.push({
              line: line.replaceAll(regex, `<mark>${word}</mark>`),
              index
            })
          }
          index++
        })
        if (node.matchs.length > 1) collections.push(node)
      }
    }
    dfs(defaultPath)
    if (collections.length > 0) return collections
    else return notFind
  })

}

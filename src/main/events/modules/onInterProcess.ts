import { dialog, ipcMain } from 'electron'
import { existsSync, lstatSync, readFileSync, readdirSync, renameSync } from 'fs'
import { basename, dirname, resolve } from 'path'
import { GET_FILE_CONTENT, GET_SEARCH_RESULT, RENAME_FILE } from '../../../common/eventType'
import { SearchWords } from '../../../common/types'
import { defaultPath, EXCEPT_FILE } from '../../config'

export const onInterProcess = () => {
  ipcMain.handle(GET_FILE_CONTENT, (_e, path: string) => {
    if (existsSync(path)) {
      return readFileSync(path, 'utf-8')
    } else return 'error path: ' + path
  })
  ipcMain.handle(GET_SEARCH_RESULT, (_e, word: string, isCase = false, isBlank = false) => {
    const regex = new RegExp(isBlank ? `\\s${word}\\s` : word, isCase ? 'g' : 'gi')
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
    if (!word) return notFind
    const collections: SearchWords[] = []
    const dfs = (searchPath: string) => {
      if (lstatSync(searchPath).isDirectory()) {
        const fileNames = readdirSync(searchPath)
        fileNames.forEach((fileName) => {
          const nextPath = resolve(searchPath, fileName)
          if (!EXCEPT_FILE.test(nextPath)) dfs(nextPath)
        })
      } else {
        // 遍历到文件，就进行匹配
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
            // 每个块的匹配，都是相同的索引
            node.matchs.push({
              line: line.replaceAll(regex, `<mark>${isBlank ? ' ' + word + ' ' : word}</mark>`),
              index
            })
            index+=1
          }
        })
        if (node.matchs.length) collections.push(node)
      }
    }
    dfs(defaultPath)
    if (collections.length) return collections
    else return notFind
  })
  ipcMain.handle(RENAME_FILE, (_e, beforPath, newName) => {
    if (!existsSync(beforPath)) throw new Error('未找到文件')
    const dir = dirname(beforPath)
    const newPath = resolve(dir, newName)
    if(existsSync(newPath)) {
      dialog.showMessageBoxSync({
        type: 'info',
        message: '文件已经存在'
      })
      return false
    }
    renameSync(beforPath, newPath)
    return true
  })
}

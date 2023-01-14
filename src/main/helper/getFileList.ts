import { lstatSync, readdirSync } from 'fs'
import { basename,  resolve } from 'path'
import { IFileList } from '../../common/interface'
const exceptFile = /^\./
export const getFileList = (path: string) => {
  const paths: IFileList[] = []
  const dfs = (path: string) => {
    if (!lstatSync(path).isDirectory()) {
      paths.push({
        fileName: basename(path),
        filePath: path
      })
      return
    }
    readdirSync(path).forEach((file) => {
      const nextPath = resolve(path, file)
      !exceptFile.test(basename(nextPath)) && dfs(nextPath)
    })
  }
  dfs(path)
  return paths
}

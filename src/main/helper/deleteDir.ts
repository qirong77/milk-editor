import { existsSync, readdirSync, rmdirSync, statSync, unlinkSync } from 'fs'
import { resolve } from 'path'

export const deleteDir = (path: string) => {
  const dfs = (path: string) => {
    const files = readdirSync(path)
    if (existsSync(path)) {
      files.forEach((file) => {
        const currentPath = resolve(path, file)
        if (statSync(currentPath).isDirectory()) {
          deleteDir(currentPath)
        } else unlinkSync(currentPath)
      })
    }
  }
  dfs(path)
  rmdirSync(path)
}

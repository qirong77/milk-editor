import { lstatSync, readdirSync, renameSync } from 'fs'

export const removePath = (path: string, newDir: string) => {
  if (readdirSync(newDir).includes(path)) throw new Error('文件已经存在！')
  if (lstatSync(path).isDirectory()) {
    renameSync(path,newDir)
  } else {
  }
}

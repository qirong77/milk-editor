import { lstatSync, readdirSync } from 'fs'
import { basename, resolve } from 'path'

import { homedir } from 'os'
import { FileTree } from '../../common/interface'
// 点号开头或者不是md结尾的都不要
const exceptFile = /\.[^(md)]$|^\./
const defaultPath = resolve(homedir(), 'Desktop', 'front-end-book', 'text')
// 读取某个文件路径的文件树，只针对md文件
export const getDirectoryTree = (path = defaultPath, level = 0) => {
  const node: FileTree = {
    fileName: basename(path),
    children: [],
    path,
    level,
    isDir: false
  }
  if (!lstatSync(path).isDirectory()) return node
  node.isDir = true
  readdirSync(path).forEach((fileName) => {
    if (exceptFile.test(fileName)) return
    const nextPath = resolve(path, fileName)
    const newNode = getDirectoryTree(nextPath, level + 1)
    newNode && node.children.push(newNode)
  })

  return node
}

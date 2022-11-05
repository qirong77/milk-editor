import { lstatSync, readdirSync } from 'fs'
import { basename, resolve } from 'path'

import { homedir } from 'os'
import { FileTree } from '../../common/interface'

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
  if (!lstatSync(path).isDirectory()) {
    if (!/\.md$/.test(path)) return null
    else return node
  } else {
    node.isDir = true
    readdirSync(path).forEach((fileName) => {
      const nextPath = resolve(path, fileName)
      const newNode = getDirectoryTree(nextPath, level + 1)
      newNode && node.children.push(newNode)
    })
  }
  return node
}

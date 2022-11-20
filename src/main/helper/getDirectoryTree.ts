import { existsSync, lstatSync, readdirSync } from 'fs'
import { basename, resolve } from 'path'

import { FileTree } from '../../common/interface'
import { defaultPath } from '../electron/config'
import { EXCEPT_FILE } from '../electron/config/constant'
export const getDirectoryTree = (path: string, level = 0, parentNode: null | FileTree = null) => {
  if (!existsSync(path)) path = defaultPath
  const node: FileTree = {
    fileName: basename(path),
    children: [],
    path,
    level,
    isDir: false,
    showInput: false,
    active: false,
    parentNode,
  }
  // node.parentNode = parentNode
  if (!lstatSync(path).isDirectory()) return node
  node.isDir = true
  readdirSync(path).forEach((fileName) => {
    if (EXCEPT_FILE.test(fileName)) return
    const nextPath = resolve(path, fileName)
    const newNode = getDirectoryTree(nextPath, level + 1, node)
    newNode && node.children.push(newNode)
  })
  return node
}

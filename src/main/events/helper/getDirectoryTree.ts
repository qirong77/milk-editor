import { existsSync, lstatSync, readdirSync } from 'fs'
import { basename, resolve } from 'path'
import { DirTree } from '../../../common/types'

import { defaultPath, EXCEPT_FILE } from '../../config'

export const getDirectoryTree = (path: string, level = 0) => {
  const paths: string[] = []
  const dfs = (path: string, level = 0) => {
    if (!existsSync(path)) path = defaultPath
    const node: DirTree = {
      fileName: basename(path),
      children: [],
      path,
      level,
      isDir: false,
      opened: true
    }
    if (!lstatSync(path).isDirectory()) return node
    node.isDir = true
    readdirSync(path).forEach((fileName) => {
      if (EXCEPT_FILE.test(fileName)) return
      const nextPath = resolve(path, fileName)
      !lstatSync(nextPath).isDirectory() && paths.push(nextPath)
      const newNode = dfs(nextPath, level + 1)
      newNode && node.children.push(newNode)
    })
    // 如果当前节点是文件夹就对里面的文件进行排序，文件排前面，文件夹排后面
    const folders = node.children.filter((child) => lstatSync(child.path).isDirectory())
    const files = node.children.filter((child) => !lstatSync(child.path).isDirectory())
    node.children = [...files, ...folders]
    return node
  }
  const tree = dfs(path, level)
  return [tree, paths]
}

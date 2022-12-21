import { windowsMap } from '../main'

export type FileTree = {
  fileName: string
  level: number
  children: FileTree[]
  path: string
  isDir: boolean
  showInput: boolean
  active: boolean
  parentNode: FileTree |null
}
export type IFileList = {
  fileName: string
  filePath: string
}

export type WindowsMap = typeof windowsMap

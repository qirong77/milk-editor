export type FileTree = {
  fileName: string
  level: number
  children: FileTree[]
  path: string
  isDir: boolean
}

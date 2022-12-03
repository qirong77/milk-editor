export interface DirTree {
  fileName: string
  level: number
  children: DirTree[]
  path: string
  isDir: boolean
  opened: boolean
}

export interface DirTree {
  fileName: string
  level: number
  children: DirTree[]
  path: string
  isDir: boolean
  opened: boolean
}
export type SearchWords  = {
  fileName: string
  path: string
  matchs: {
    line:string,
    index:number
  }[]
}
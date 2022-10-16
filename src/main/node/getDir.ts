import { homedir } from 'os'
import { existsSync, readdirSync} from 'fs'
import { resolve } from 'path'

export const getDefaultDirContents = () => {
  const desktopDir = resolve(homedir(), 'Desktop')
  const defaultDirPath = resolve(desktopDir, 'front-end-book', 'Markdowns')
  if (existsSync(defaultDirPath)) {
    const IS_MARKDOWN = /\.md$/
    const markdownFiles = readdirSync(defaultDirPath).filter((path) => {
      if (IS_MARKDOWN.test(path)) return path
      // filter可以return flase？
      else return false
    })
    const contents = markdownFiles.map((file) => {
      const filePath = resolve(defaultDirPath, file)
      return {
        fileName: file,
        filePath:filePath
      }
    })
    return contents
  } else {
    return resolve(homedir())
  }
}

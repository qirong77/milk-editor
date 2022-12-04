import { resolve } from 'path'
import { homedir } from 'os'

export const NEW_FILE_NAME = '未命名文件'
export const NEW_DIR_NAME = '未命名文件夹'
export const DEFAULT_CONTENT = `blank content`
// 点号开头或者不是md结尾的都不要
export const EXCEPT_FILE = /\.[^(md)]$|^\./

// 生产环境
// export const defaultPath = resolve(homedir(), 'Desktop', 'front-end-book', 'Markdowns')
// 测试环境
export const defaultPath = resolve(homedir(), 'Desktop', 'front-end-book', 'test')

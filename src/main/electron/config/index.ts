import { resolve } from 'path'
import { homedir } from 'os'
// 生产环境
// export const defaultPath = resolve(homedir(), 'Desktop', 'front-end-book', 'Markdowns')
// 测试环境
export const defaultPath = resolve(homedir(), 'Desktop', 'front-end-book', 'test')

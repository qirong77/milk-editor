
// 事件类型，尽量用两个单词表示 动词 + 名词
// 1. 渲染进程 -> 主进程的事件
export const GET_DIR_TREE = 'get dir tree'
export const SAVE_FILE = 'save file'
// 2. interProcess
export const GET_FILE_CONTENT = 'get file content'

// 3. 主进程 -> 渲染进程
export const UPDATE_DIR_TREE = 'update a dir tree'
export const RENAME_FILE = 'rename a file'
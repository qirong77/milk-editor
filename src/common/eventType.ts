

// 事件类型，尽量用两个单词表示 动词 + 名词
// 1. 渲染进程 -> 主进程的事件
export const CLOSE_SCREEN = 'close'
export const MAX_SCREEN = 'max'
export const MIN_SCREEN = 'min'
export const NEW_FILE = 'add a new file'
export const RENAME_FILE = 'rename file'


// interProcess
export const GET_FILE_LIST = 'get file list'


// main -> renender
export const OPEN_FILE = 'open a file'
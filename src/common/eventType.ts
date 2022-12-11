
// 事件类型，尽量用两个单词表示 动词 + 名词
// 1. 渲染进程 -> 主进程的事件
export const GET_DIR_TREE = 'get dir tree'
export const SAVE_FILE = 'save file'
export const POP_FILE_ITEM_MENU = 'pop a file item menu'
export const POP_FILE_DIR_MENU = 'pop a file dir menu'
export const DELETE = 'delet a fiile'
export const CREATE_NEW = 'create file'
export const CREATE_DIR = 'create dir'
// 2. interProcess
export const GET_FILE_CONTENT = 'get file content'
export const GET_SEARCH_RESULT = 'get serarch result'
// 3. 主进程 -> 渲染进程
export const UPDATE_DIR_TREE = 'update a dir tree'
export const RENAME_FILE = 'rename a file'
export const MENU_RENAME_FILE = 'menu rename file'
export const MENU_NEW_FILE = 'menu new file'
export const MENU_DELETE = 'menu delete file'
export const MENU_NEW_DIR = 'create a new dir'
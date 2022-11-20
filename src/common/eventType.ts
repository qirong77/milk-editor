// 事件类型，尽量用两个单词表示 动词 + 名词
// 1. 渲染进程 -> 主进程的事件
export const CLOSE_SCREEN = 'close'
export const MAX_SCREEN = 'max'
export const MIN_SCREEN = 'min'
export const RENAME_FILE = 'rename file'
export const POP_FILE_ITEM_MENU = 'pop file item menu'
export const POP_DIR_MENU = 'pop dir menu'
export const POP_ROOT_MENU = 'pop root dir menu'
export const POP_EDITOR_MENU = 'pop a menu in editor area'
export const SAVE_FILE = 'save a file'
export const DELETE_FILE_R = 'delete a file from renender'
// interProcess
export const GET_DIR_TREE = 'get dir tree'
export const GET_FILE_LIST = 'get file list'
export const GET_SEARCH_RESUlT = 'search word in oped dir'
// main -> renender
export const OPEN_FILE = 'open a file'
export const OPEN_DIR = 'open a dir'
export const DELETE_FILE = 'delete a file'
export const NEW_DIR = 'new directory'
export const NEW_FILE = 'add a new file'
export const DELETE_DIR = 'delet a dir'
export const RENAME_FILE_DONE = '重新命名一个文件后通知更新保存路径'
export const TRANSLATION = 'notify to translate current selection'
// 渲染进程 -> 主进程
export const CLOSE_SCREEN = 'close'
export const MAX_SCREEN = 'max'
export const MIN_SCREEN = 'min'
export const OPEN_DEFAULT_DIR = 'open a dictory and initialize'
export const CLICK_FILE_LIST = 'click file list and open a new file'
export const SAVE_FILE = 'edite and should file update'
export const NEW_FILE = 'add a new file'
export const POP_FILE_LIST_MENU = 'open file list menu'
export const UPDATE_FILE_LIST = 'update file list'

// 主进程 -> 渲染进程
export const OPEN_NEW_FILE = 'open a new file and update-milk-editor-content' as string

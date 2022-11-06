import { resolve } from 'path'
import { homedir } from 'os'

export const defaultPath = resolve(homedir(), 'Desktop', 'front-end-book', 'text')
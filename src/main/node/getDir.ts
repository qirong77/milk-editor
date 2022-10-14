import { homedir } from 'os';
import { existsSync } from 'fs';
import { resolve } from 'path';

export const getDeskDir = () => {
    const desktopDir = resolve(homedir(), 'Desktop')
    if(existsSync(desktopDir)) {
        return desktopDir
    } else {
        return resolve(homedir())
    }
}
export const getDefaultOpenDir = () => {
    const path = resolve(getDeskDir(),'front-end-book','Markdowns')
    return path
}
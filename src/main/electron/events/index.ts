import { BrowserWindow } from "electron"
import { onInterProcess } from "./modules/onInterProcess"
import { onRender } from "./modules/onRender"

export const onEvents = (window:BrowserWindow) =>{
    onRender(window)
    onInterProcess()
}
import { OPEN_FILE } from "../../../common/eventType"

export const openFile = (path:string )=>{
    window.api.sendToMain(OPEN_FILE, path)
}
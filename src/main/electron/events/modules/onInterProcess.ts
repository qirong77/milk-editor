import { ipcMain } from "electron"
import { GET_FILE_LIST } from "../../../../common/eventType"
import { getDirectoryTree } from "../../../helper/getDirectoryTree"


export const onInterProcess = () => {
    ipcMain.handle(GET_FILE_LIST,()=>{
        return getDirectoryTree()
    })
}
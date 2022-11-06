import { ipcMain } from "electron"
import { GET_FILE_LIST, POP_FILE_ITEM_MENU } from "../../../../common/eventType"
import { getDirectoryTree } from "../../../helper/getDirectoryTree"
import { createFilItemMenu } from "../../menu/modules/contextMenu/fileItem"


export const onInterProcess = (openedDir:string) => {
    ipcMain.handle(GET_FILE_LIST,()=>{
        return getDirectoryTree(openedDir)
    })
    ipcMain.handle(POP_FILE_ITEM_MENU, (_e, path) => {
        const menu = createFilItemMenu(path)
        menu.popup({
          window
        })
      })
}

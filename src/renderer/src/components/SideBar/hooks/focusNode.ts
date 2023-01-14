import { SHOW_INPUT } from "./mapFileList"

export const focusNode = (path:string) => {
    const node = document.getElementById(path)
    if(node) {
        if(!node.classList.contains(SHOW_INPUT)) {
            node.classList.add(SHOW_INPUT)
        }
        const input = node.querySelector('input')
        input?.focus()
    }
}
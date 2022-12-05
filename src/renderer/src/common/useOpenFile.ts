import { useStore } from "../store"

export const useOpenFile = (path) =>{
    const store = useStore()
    store.changeActivePath(path)
    store.changeOpenedPath(path)
}
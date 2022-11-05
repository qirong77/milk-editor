import { useEffect, useRef } from 'react'
import { mapFileList } from '../hooks/mapFileList'

export const FileList = () => {
  const ref = useRef<HTMLDivElement>(null)
  const getFileList = async () => {
    const fileList = await window.api.onGetFileList()
    const fileNodes = mapFileList(fileList)
    ref.current!.innerHTML = ''
    ref.current?.appendChild(fileNodes)
    console.log(fileList)
  }
  // 渲染的时候就获取文件列表
  useEffect(() => {
    getFileList()
    ref.current?.addEventListener('input',e=>{
      console.log(e)
    })
  }, [])

  return <div className="file-list" ref={ref}></div>
}

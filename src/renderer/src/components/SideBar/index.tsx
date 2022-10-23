import { useEffect, useState } from 'react'
import { DragLine } from './components/DragLine'
import { FileList } from './components/FileList'
import { IFileList } from 'src/preload/index.d'
import { MenuSvg, SearchSvg } from '@renderer/common/svg'
import { useUpdateHeaders } from './hooks/useUpdateHeader'
import { SearchFile } from '../Search/SearchFile'
interface ISideBar {
  fileList: IFileList
  updateFiles: () => void
}
export const SideBar: React.FC<ISideBar> = ({ fileList, updateFiles }) => {
  console.log('side-bar')
  const [showFileList, setShowFileList] = useState(true)
  const [openSearchFile, setOpenSearchFile] = useState(false)
  useEffect(() => {
    const hanldeHideBar = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        console.log('command + B')
        useUpdateHeaders()
      }
      if (e.code === 'KeyP' && e.metaKey) {
        console.log('commend + P')
        console.log(openSearchFile)
        setOpenSearchFile(!openSearchFile)
      }
    }
    document.addEventListener('keydown', hanldeHideBar)
    return () => document.removeEventListener('keydown', hanldeHideBar)
  }, [openSearchFile])
  const openFile = (filePath: string) => {
    window.api.clickFileList(filePath)
    setShowFileList(false)
  }
  return (
    <div className="side-bar">
      <header>
        <MenuSvg
          onClick={() => {
            setShowFileList(!showFileList)
          }}
        />
        <span>title</span>
        <SearchSvg />
      </header>
      <DragLine />
      {showFileList && (
        <FileList updateFiles={updateFiles} fileList={fileList} openFile={openFile} />
      )}
      {!showFileList && <ul className="header-list" />}
      {openSearchFile && (
        <SearchFile
          fileList={fileList}
          openFile={openFile}
          closeSearchFile={() => {
            setOpenSearchFile(false)
          }}
        />
      )}
    </div>
  )
}

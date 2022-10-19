import { IFileList } from 'src/preload/index.d'

interface ISearchFile {
  fileList: IFileList
}
export const SearchFile: React.FC<ISearchFile> = ({ fileList }) => {
  const files = fileList.map((file) => {
    return (
      <li key={file.filePath}>
        <span>{file.fileName}</span>
      </li>
    )
  })
  return (
    <div className="search-file">
      <div>
        <input type="text" />
      </div>
      <ul>{files}</ul>
    </div>
  )
}

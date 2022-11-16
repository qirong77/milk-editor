import { useState } from 'react'
import debounce from 'debounce'
type WordGlobal = {
  fileName: string
  filePath: string
  matchs: string[]
}[]
export const searchWordGlobal: React.FC<WordGlobal> = (words) => {
  const [word, searchWord] = useState()
  // 这个怎么使用ts更给数据需要看一下文档
  const iptChange = () => {

  }

  return (
    <div className="swg">
      <div>
        向右的箭头 <input type="text" onChange={iptChange} />
      </div>
      <div className="tip">在=个文件中有=个结果</div>
      {words.map((word) => {
        return (
          <ul key={word.filePath}>
            <li>{word.fileName}</li>
            {word.matchs.map((match, index) => {
              return <li key={index}>{match}</li>
            })}
          </ul>
        )
      })}
    </div>
  )
}

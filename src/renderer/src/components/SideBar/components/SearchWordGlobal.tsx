import { ChangeEvent, useEffect, useState } from 'react'
import debounce from 'debounce'
import { SearchWords } from '../../../../../common/types'
import { openFile } from '../../../common/openFile'
const SearchItem: React.FC<{
  match: { fileName: string; path: string; matchs: string[] }
}> = ({ match }) => {
  const [autoHeight, setHeight] = useState(false)
  const openSelect = () => {
   match.path && openFile(match.path)
    // 在滚到指定位置
  }
  return (
    <ul
      style={{
        height: autoHeight ? 'auto' : '30px'
      }}
      onClick={() => setHeight(!autoHeight)}
    >
      <li className="fileName" onClick={openSelect}>
        <svg
          className={autoHeight ? '' : 'open'}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
        {match.fileName}
      </li>
      {match.matchs.map((paragraph, index) => {
        return <li key={index}>{paragraph}</li>
      })}
    </ul>
  )
}
export const SearchWordGlobal: React.FC<{
  show: boolean
}> = ({ show }) => {
  const [word, setWord] = useState('')
  const debouncedSetWord = debounce(setWord, 500)
  const [total,setTotal] = useState(0)
  const [matchs, setMatchs] = useState<SearchWords>()
  const iptChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetWord(e.target.value)
  }
  useEffect(() => {
    window.api.searchDirWord(word).then((res) => {
      setMatchs(res)
      const total = res.reduce((preSum,file)=>{
        return file.matchs.length + preSum
      },0)
    setTotal(total)
    })
  }, [word])
  return (
    <div
      className="swg"
      style={{
        display: show ? 'block' : 'none'
      }}
    >
      <div className='input'>
        <input type="text" onChange={iptChange} />
      </div>
      <div className="tip">在 {matchs?.length} 个文件中有 {total} 个结果</div>
      {matchs &&
        matchs.map((match) => {
          return <SearchItem key={match.path} match={match} />
        })}
    </div>
  )
}

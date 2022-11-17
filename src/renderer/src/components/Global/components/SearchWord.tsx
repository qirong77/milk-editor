import { ChangeEvent } from 'react'

export const SearchWord = ({setWord}) => {
  const onIputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setWord(value)
  }
  return (
    <div className="search-word">
      <input type="text" onChange={onIputChange} />
    </div>
  )
}

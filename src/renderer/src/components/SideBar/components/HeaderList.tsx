import { useEffect } from 'react'

export const HeaderList = ({ toggle }) => {
  useEffect(() => {
  }, [toggle])
  return (
    <div
      style={{
        display: !toggle ? 'block' : 'none'
      }}
      className='header-list'
    >
    </div>
  )
}

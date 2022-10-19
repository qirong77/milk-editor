import React, { useRef } from 'react'

interface IHeaderList {}

export const HeaderList: React.FC<IHeaderList> = () => {
  const headerListRef = useRef(null)
  return <ul className={'header-list'} ref={headerListRef}></ul>
}

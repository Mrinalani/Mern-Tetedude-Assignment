import React from 'react'
import Friends from './Friends'
import Requests from './Requests'

const Layout = ({children}) => {
  return (
    <div className='mt-6'>
        <div className='flex w-full px-2 lg:px-6'>
      <div className='w-[25%] border-2'><Friends /></div>
      <div className='w-[50%] border-2'>{children}</div>
      <div className='w-[25%] border-2'><Requests /></div>
    </div>
    </div>
  )
}

export default Layout

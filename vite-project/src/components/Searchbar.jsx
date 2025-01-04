import React from 'react'

const Searchbar = () => {
  return (
    <div >
        <div className='mt-6 w-full flex justify-end px-6'>
      <label htmlFor="search" className='text-lg mt-2 '>Search</label>
      <input type="text" id="search" placeholder='Search Friend... ' className=' border-2 ml-2 px-3  rounded-lg w-[300px] h-10'/>
    </div>
    </div>
  )
}

export default Searchbar

import React from 'react'

const Navbar = () => {
  return (
    <div className='flex'>
        <div className='flex justify-between
         w-full bg-black text-lg p-6 text-white'>
        <div>
        <span>Home</span>
        </div>

        <div className='flex gap-4 lg:gap-8'>
      <span>Profile</span>
      <span>Friends</span>
      <span>Requests</span>
      </div>

      </div>
    </div>
  )
}

export default Navbar

import React from 'react'

const Friends = () => {
    const FRIENDS = [
        {
            Name:"Rani",
            Email:"rani@gmail.com",
        },
        {
            Name:"Ragini",
            Email:"ragini@gmail.com",
        },
        {
            Name:"Mrinalani",
            Email:"mrinalani@gmail.com",
        },
        {
            Name:"Manku",
            Email:"manku@gmail.com",
        }
    ]
  return (
    <div className='max-h-screen'>
        <h1 className='text-3xl ml-6 py-6 text-center font-bold'>Friends</h1>
       <div className='h-screen'>
        <div className='overflow-y-scroll max-h-screen px-4'>
        {FRIENDS.map(({Name, Email})=>(
            <div className=''>
            <div className='flex flex-col border-2 border-black mt-2 p-1'>
                <h1 className='text-xl text-blue-400'>{Name}</h1>
                <h3>{Email}</h3>
                <button className='border-2 border-black mt-2 text-white bg-blue-500 hover:bg-blue-600'>Unfollow</button>
            </div>
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default Friends

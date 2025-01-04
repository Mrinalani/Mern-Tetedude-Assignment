import React from 'react'
import Layout from './Layout'

const Users = () => {
    const USER = [
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
    <Layout className="">
        <div className='h-screen'>
        <div className='overflow-y-scroll max-h-screen px-4'>
        <h1 className='text-3xl ml-6 py-4 text-center font-bold'>Users</h1>

        {USER.map(({Name, Email})=>(
            <div className=''>
            <div className='flex flex-col border-2 border-black mt-6 p-6'>
                <h1 className='text-3xl text-blue-400'>{Name}</h1>
                <h3>{Email}</h3>
                <button className='border-2 border-black mt-4 text-white bg-blue-500 hover:bg-blue-600'>Follow</button>
            </div>
            </div>
        ))}
        </div>
        </div>
    </Layout>
  )
}

export default Users

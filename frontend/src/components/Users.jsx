import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import UserCard from './userCard'

const Users = () => {
    const [allUser, setAllUser] = useState([])

    useEffect(()=>{
        const fetchUsers = async() => {
            try {
                const token = localStorage.getItem('token')
                const users = await axios.get('http://localhost:3000/allUsers',{ headers: { "Authorization": token }});
                console.log(users.data.users)
                setAllUser(users.data.users)

            } catch (error) {
                console.error("Error fetching users:", error);
                // alert(error.response.data.error || "something went wrong")
            }
        }
        fetchUsers();

    },[])
  return (
    <Layout className="">
        <div className='h-screen'>
        <div className='overflow-y-scroll max-h-screen px-4'>
        <h1 className='text-3xl ml-6 py-4 text-center font-bold'>Users</h1>

        {allUser.map((user)=>(
            <div className=''>
            <UserCard user={user}/>
            </div>
        ))}
        </div>
        </div>
    </Layout>
  )
}

export default Users

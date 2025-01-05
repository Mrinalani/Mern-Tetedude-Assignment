import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FriendCard from './FriendCard'

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
    const [friends, setFriends] = useState([])
    
    useEffect(()=>{

        const fetchFriends = async() => {
            try {
                const token = localStorage.getItem('token')
                const friends = await axios.get('http://localhost:3000/getfriends', { headers: { "Authorization": token }});
                console.log("friends",friends.data.userFriends)
                setFriends(friends.data.userFriends || [])

            } catch (error) {
                console.error("Error fetching users:", error);
                // alert(error.response.data.error || "something went wrong")
            }
        }
        fetchFriends()
    },[])
  return (
    <div className='max-h-screen'>
        <h1 className='text-3xl ml-6 py-6 text-center font-bold'>Friends</h1>
       <div className='h-screen'>
        <div className='overflow-y-scroll max-h-screen px-4'>
        {friends.map((user)=>(
            <div className=''>
           <FriendCard user={user}/>
            </div>
        ))}
        </div>
        </div>
    </div>
  )
}

export default Friends

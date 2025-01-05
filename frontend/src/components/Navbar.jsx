import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [localUser, setLocalUser] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = await axios.get('http://localhost:3000/getUser', {
          headers: { Authorization: token },
        });
        setLocalUser(user.data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className='flex'>
        <div className='flex justify-between
         w-full bg-black text-lg p-6 text-white'>
        <div>
        <span>Home</span>
        </div>

        <div className='flex gap-4 lg:gap-8'>
      <span className='capitalize'>{localUser.Name}</span>
      
      </div>

      </div>
    </div>
  )
}

export default Navbar

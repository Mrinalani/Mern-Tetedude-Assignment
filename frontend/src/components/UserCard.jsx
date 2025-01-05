// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const UserCard = ({user}) => {
//     const [isFollowing, setFollowing] = useState(false)
//     const [localUser, setLocalUser] = useState({})
//    console.log("userrrrrrr")
//     useEffect(()=>{
//         const fetchUser = async() => {
//             try {
//                 const token = localStorage.getItem('token')
//                 const user = await axios.get('http://localhost:3000/getUser', { headers: { "Authorization": token }});
//                 console.log("localuser",user.data.user)
//                 setLocalUser(user.data.user)

//             } catch (error) {
//                 console.error("Error fetching users:", error);
//                 // alert(error.response.data.error || "something went wrong")
//             }
//         }
//         fetchUser();

//     },[])

//     useEffect(() => {
//         // console.log("jjrtnbkjtnbkjtjj")
//         if (localUser.Followings && localUser.Followings.includes(user._id)) {
//             console.log("hdfbvjhbgvhbdjbh",localUser.Followings, user._id)
//             setFollowing(true);
//         }
//     }, [localUser, user]);


//     const handleFollowClick = async(user) => {
//         try {
//             const token = localStorage.getItem('token')
//             console.log("token", token)
//             const response = await axios.post(`http://localhost:3000/followfriend/${user._id}`,{},  { headers: { "Authorization": token }})
//             console.log(response)
//             setFollowing(true);

//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//        }

//        const handleUnFollowClick = async() => {
//         try {
//             const token = localStorage.getItem('token')
//             console.log("token", token)
//             const response = await axios.post(`http://localhost:3000/unfollowfriend/${user._id}`,{},  { headers: { "Authorization": token }})
//             console.log(response)
//             setFollowing(false);

//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//        }
//   return (
//     <div>
//       <div className='flex flex-col border-2 border-black mt-6 p-6'>
//                 <h1 className='text-3xl text-blue-400'>{user.Name}</h1>
//                 <h3>{user.Username}</h3>
//                 {
//                     isFollowing?<button className='border-2 border-black mt-4 text-white bg-blue-500 hover:bg-blue-600' onClick={()=>handleUnFollowClick(user)}>Unfollow</button>:
//                     <button className='border-2 border-black mt-4 text-white bg-blue-500 hover:bg-blue-600' onClick={()=>handleFollowClick(user)}>Follow</button>

//                 }
//             </div>
//     </div>
//   )
// }

// export default UserCard


import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserCard = ({ user }) => {
  const [isFollowing, setFollowing] = useState(false);
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

  useEffect(() => {
    if (localUser.Followings && localUser.Followings.includes(user._id)) {
      setFollowing(true);
    }
  }, [localUser, user]);

  const handleFollowClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/followfriend/${user._id}`,
        {},
        { headers: { Authorization: token } }
      );
      console.log(response);
      setFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnFollowClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/unfollowfriend/${user._id}`,
        {},
        { headers: { Authorization: token } }
      );
      console.log(response);
      setFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div className="flex justify-center mb-10 bg-gray-100">
      <div className=" shadow-lg rounded-lg p-6 w-80 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{user.Name}</h1>
        <h3 className="text-gray-500 mb-4">{user.Username}</h3>
        {isFollowing ? (
          <button
            className="w-full py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition duration-300"
            onClick={handleUnFollowClick}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="w-full py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-300"
            onClick={handleFollowClick}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;

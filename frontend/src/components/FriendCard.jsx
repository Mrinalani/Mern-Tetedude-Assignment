import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FriendCard = ({ user }) => {
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
      setFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 shadow-lg rounded-lg p-6 mb-6 w-80">
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600 mb-4">
        {user.Name[0]}
      </div>
      <h1 className="text-lg font-bold text-gray-800">{user.Name}</h1>
      <h3 className="text-sm text-gray-500 mb-4">@{user.Username}</h3>
      {isFollowing ? (
        <button
          className="w-full py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition duration-300"
          onClick={handleUnFollowClick}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="w-full py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-300"
          onClick={handleFollowClick}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FriendCard;

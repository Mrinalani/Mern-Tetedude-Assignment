
import axios from 'axios';
import React, { useState } from 'react';

const RequestCard = ({ request }) => {
  const [showCard, setShowCard] = useState(true);

  const handleAcceptClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/acceptrequest/${request._id}`, {}, {
        headers: { Authorization: token },
      });
      setShowCard(false);
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/rejectrequest/${request._id}`, {}, {
        headers: { Authorization: token },
      });
      setShowCard(false);
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="w-full">
      {showCard && (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
          <h1 className="text-lg font-bold text-gray-700">{request.Name}</h1>
          <h3 className="text-sm text-gray-500">{request.Username}</h3>
          <div className="flex gap-4 mt-4">
            <button
              className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
              onClick={handleAcceptClick}
            >
              Accept
            </button>
            <button
              className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleRejectClick}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;


// client/src/components/RoomDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const [asylumSeekers, setAsylumSeekers] = useState([]);
  const { hotelId, floorNumber, roomNumber } = useParams();

  useEffect(() => {
    // Fetch the list of asylum seekers in the selected room from the backend
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/hotels/${hotelId}/floors/${floorNumber}/rooms/${roomNumber}/asylum-seekers`)
      .then((response) => {
        setAsylumSeekers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching asylum seekers:', error);
      });
  }, [hotelId, floorNumber, roomNumber]);

  return (
    <div>
      <h2>Room {roomNumber} Details</h2>
      <h3>Asylum Seekers:</h3>
      <ul>
        {asylumSeekers.map((asylumSeeker) => (
          <li key={asylumSeeker._id}>
            {asylumSeeker.name} - Status: {asylumSeeker.status ? 'Checked In' : 'Checked Out'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomDetails;

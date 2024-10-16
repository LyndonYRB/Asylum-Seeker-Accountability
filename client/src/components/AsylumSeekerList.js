// client/src/components/AsylumSeekerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AsylumSeekerList = () => {
  const [asylumSeekers, setAsylumSeekers] = useState([]);
  const [hotelName, setHotelName] = useState('');
  
  const { hotelId, floorNumber, roomNumber: selectedRoom } = useParams();

  useEffect(() => {
    // Fetch the hotel details to get the hotel name
    axios
      .get(`${process.env.REACT_APP_API_URL}api/hotels/${hotelId}`)
      .then((response) => {
        setHotelName(response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching hotel details:', error);
      });

   // Fetch the asylum seekers for the selected room
axios
.get(`${process.env.REACT_APP_API_URL}api/hotels/${hotelId}/floors/${floorNumber}/rooms/${selectedRoom}/asylum-seekers`)
.then((response) => {
  console.log('Fetched asylum seekers:', response.data);
  setAsylumSeekers(Array.isArray(response.data) ? response.data : []);
})
.catch((error) => {
  console.error('Error fetching asylum seekers:', error);
  setAsylumSeekers([]);
});;
  }, [hotelId, floorNumber, selectedRoom]);

  return (
    <div>
      <h2>Asylum Seekers in Room {selectedRoom}</h2>
      <h3>Hotel: {hotelName}</h3>
      <h4>Floor: {floorNumber}</h4>

      {asylumSeekers.length > 0 ? (
        <ul>
          {asylumSeekers.map((asylumSeeker) => (
            <li key={asylumSeeker._id}>
              {asylumSeeker.name} - {asylumSeeker.status ? 'Checked In' : 'Checked Out'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No asylum seekers assigned to this room.</p>
      )}
    </div>
  );
};

export default AsylumSeekerList;

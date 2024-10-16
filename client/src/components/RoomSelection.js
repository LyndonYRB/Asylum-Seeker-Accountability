// client/src/components/RoomSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RoomSelection = () => {
  const [rooms, setRooms] = useState([]);
  const [hotelName, setHotelName] = useState('');
  const { hotelId, floorNumber } = useParams();
  const navigate = useNavigate();

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

    // Fetch the list of rooms for the selected floor from the backend
    axios
      .get(`${process.env.REACT_APP_API_URL}api/hotels/${hotelId}/floors/${floorNumber}/rooms`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, [hotelId, floorNumber]);

  const handleRoomSelection = (roomNumber) => {
    // Navigate to the asylum seeker list page for the selected room
    navigate(`/hotel/${hotelId}/floor/${floorNumber}/room/${roomNumber}`);
  };

  return (
    <div>
      <h2>Select a Room</h2>
      <h3>Hotel: {hotelName}</h3>
      <h4>Floor: {floorNumber}</h4>
      <ul>
        {Array.isArray(rooms) ? (
          rooms.map((room) => (
            <li key={room.roomNumber}>
              <button onClick={() => handleRoomSelection(room.roomNumber)}>
                Room {room.roomNumber}
              </button>
            </li>
          ))
        ) : (
          <p>No rooms available for this floor.</p>
        )}
      </ul>
    </div>
  );
};

export default RoomSelection;

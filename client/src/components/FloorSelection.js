// client/src/components/FloorSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FloorSelection = () => {
  const [floors, setFloors] = useState([]);
  const [hotelName, setHotelName] = useState(''); // State to store the hotel name
  const { hotelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the hotel details to get the hotel name
    axios
      .get(`${process.env.REACT_APP_API_URL}api/hotels/${hotelId}`)
      .then((response) => {
        setHotelName(response.data.name); // Set the hotel name in the state
      })
      .catch((error) => {
        console.error('Error fetching hotel details:', error);
      });

    // Fetch the list of floors for the selected hotel
    axios
      .get(`${process.env.REACT_APP_API_URL}api/hotels/${hotelId}/floors`)
      .then((response) => {
        setFloors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching floors:', error);
      });
  }, [hotelId]);

  const handleFloorSelection = (floorNumber) => {
    navigate(`/hotel/${hotelId}/floor/${floorNumber}`);
  };

  return (
    <div>
      <h2>Select a Floor</h2>
      <h3>Hotel: {hotelName}</h3> {/* Display the hotel name */}
      <ul>
        {Array.isArray(floors) ? (
          floors.map((floor) => (
            <li key={floor.number}>
              <button onClick={() => handleFloorSelection(floor.number)}>
                Floor {floor.number}
              </button>
            </li>
          ))
        ) : (
          <p>No floors available for this hotel.</p>
        )}
      </ul>
    </div>
  );
};

export default FloorSelection;

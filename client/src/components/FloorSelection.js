// client/src/components/FloorSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FloorSelection = () => {
  const [floors, setFloors] = useState([]);
  const { hotelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of floors for the selected hotel from the backend
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
    // Navigate to the next screen with the selected floor number
    navigate(`/hotel/${hotelId}/floor/${floorNumber}`);
  };

  return (
    <div>
      <h2>Select a Floor</h2>
      <ul>
        {floors.map((floor) => (
          <li key={floor.number}>
            <button onClick={() => handleFloorSelection(floor.number)}>
              Floor {floor.number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FloorSelection;

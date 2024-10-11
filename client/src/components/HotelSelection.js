import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HotelSelection = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of hotels from the backend
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/hotels`)
      .then((response) => {
        console.log('Fetched hotels response:', response); // Log the entire response
        setHotels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  const handleHotelSelection = () => {
    if (selectedHotel) {
      // Navigate to the next screen with the selected hotel ID
      navigate(`/hotel/${selectedHotel}`);
    }
  };


  return (
    <div>
      <h2>Select Your Hotel</h2>
      <select
        value={selectedHotel}
        onChange={(e) => setSelectedHotel(e.target.value)}
      >
        <option value="">-- Select a Hotel --</option>
        {hotels.map((hotel) => (
          <option key={hotel._id} value={hotel._id}>
            {hotel.name}
          </option>
        ))}
      </select>
      <button onClick={handleHotelSelection} disabled={!selectedHotel}>
        Confirm Hotel
      </button>
    </div>
  );
};

export default HotelSelection;

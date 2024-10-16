import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HotelSelection = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of hotels from the backend
    console.log('Using API URL:', process.env.REACT_APP_API_URL);
    axios
      .get(`${process.env.REACT_APP_API_URL}api/hotels`)
      .then((response) => {
        console.log('Fetched hotels response:', response); // Log the entire response
        if (response.data && Array.isArray(response.data)) {
          setHotels(response.data); // Adjusting to handle if the response is a direct array
        } else if (response.data && response.data.hotels) {
          setHotels(response.data.hotels); // Adjusting to handle if hotels are nested in a property
        } else {
          console.error('Unexpected response format:', response.data);
        }
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
        {Array.isArray(hotels) && hotels.map((hotel) => (
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

import { useState } from 'react';

const useRecentPlaces = () => {
  const [recentPlaces, setRecentPlaces] = useState([]);

  const addToRecentPlaces = (place) => {
    setRecentPlaces((prevPlaces) => {
      // Add the place to the beginning of the array
      const updatedPlaces = [place, ...prevPlaces];
      // Limit the number of recent places to 3
      if (updatedPlaces.length > 3) {
        updatedPlaces.pop();
      }
      return updatedPlaces;
    });
  };

  return { recentPlaces, addToRecentPlaces };
};

export default useRecentPlaces;

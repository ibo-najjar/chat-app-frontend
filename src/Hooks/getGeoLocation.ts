import { useState, useEffect } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
  error?: string;
}

const getGeoLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      },
      (error) => {
        setCoordinates({ latitude: 0, longitude: 0, error: error.message });
      },
      { enableHighAccuracy: true, timeout: 5000 } // 20 seconds
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (coordinates) {
      console.log(coordinates);
    }
  }, [coordinates]);

  return coordinates;
};

export default getGeoLocation;

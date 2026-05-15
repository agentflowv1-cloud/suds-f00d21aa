import React, { useState, useEffect } from 'react';
import { GoogleMap as Map, Marker, useJsApiLoader } from '@react-google-maps/api';
import styles from './GoogleMap.module.css';

interface Props {
  currentLocation: { lat: number; lng: number };
  serviceLocations: any[];
  onServiceLocationChange: (location: any) => void;
}

const GoogleMap: React.FC<Props> = ({
  currentLocation,
  serviceLocations,
  onServiceLocationChange,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const [map, setMap] = useState(null);

  const onMarkerClick = (location: any) => {
    onServiceLocationChange(location);
  };

  return (
    <div className={styles.mapContainer}>
      {isLoaded && (
        <Map
          mapContainerStyle={{ height: '400px', width: '800px' }}
          center={currentLocation}
          zoom={12}
          onLoad={setMap}
        >
          {serviceLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => onMarkerClick(location)}
            />
          ))}
          <Marker position={currentLocation} />
        </Map>
      )}
    </div>
  );
};

export default GoogleMap;

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GoogleMap from '../components/GoogleMap';
import ServiceLocations from '../components/ServiceLocations';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [serviceLocations, setServiceLocations] = useState([]);
  const [estimatedProcessingTimes, setEstimatedProcessingTimes] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  const handleServiceLocationChange = (location: any) => {
    setServiceLocations([location]);
  };

  const handleEstimatedProcessingTimeChange = (times: any) => {
    setEstimatedProcessingTimes(times);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Location-Based Functionality</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleMap
        currentLocation={currentLocation}
        serviceLocations={serviceLocations}
        onServiceLocationChange={handleServiceLocationChange}
      />
      <ServiceLocations
        serviceLocations={serviceLocations}
        estimatedProcessingTimes={estimatedProcessingTimes}
        onEstimatedProcessingTimeChange={handleEstimatedProcessingTimeChange}
      />
    </div>
  );
}

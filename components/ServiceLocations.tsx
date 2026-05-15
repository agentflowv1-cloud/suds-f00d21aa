import React from 'react';
import styles from './ServiceLocations.module.css';

interface Props {
  serviceLocations: any[];
  estimatedProcessingTimes: any;
  onEstimatedProcessingTimeChange: (times: any) => void;
}

const ServiceLocations: React.FC<Props> = ({
  serviceLocations,
  estimatedProcessingTimes,
  onEstimatedProcessingTimeChange,
}) => {
  const handleEstimatedProcessingTimeChange = (location: any, time: any) => {
    const newEstimatedProcessingTimes = { ...estimatedProcessingTimes };
    newEstimatedProcessingTimes[location] = time;
    onEstimatedProcessingTimeChange(newEstimatedProcessingTimes);
  };

  return (
    <div className={styles.serviceLocationsContainer}>
      {serviceLocations.map((location, index) => (
        <div key={index}>
          <h2>Service Location {index + 1}</h2>
          <p>Location: {location}</p>
          <p>Estimated Processing Time: {estimatedProcessingTimes[location]}</p>
          <input
            type="text"
            value={estimatedProcessingTimes[location]}
            onChange={(e) => handleEstimatedProcessingTimeChange(location, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceLocations;

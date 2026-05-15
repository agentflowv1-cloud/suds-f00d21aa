import type { ChangeEvent, useState } from 'react';
import styles from '../styles/ServicePicker.module.css';

const services = [
  { id: 1, name: 'Service 1', description: 'Description 1' },
  { id: 2, name: 'Service 2', description: 'Description 2' },
  { id: 3, name: 'Service 3', description: 'Description 3' },
];

const ServicePicker = () => {
  const [filteredServices, setFilteredServices] = useState(services);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredServices = services.filter((service) => service.name.toLowerCase().includes(searchTerm));
    setFilteredServices(filteredServices);
    setSearchTerm(searchTerm);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    const sortedServices = filteredServices.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredServices(sortedServices);
  };

  return (
    <div className={styles.servicePicker}>
      <input
        type='search'
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder='Search services...'
      />
      <button onClick={handleSortChange}>Sort {sortOrder === 'asc' ? 'DESC' : 'ASC'}</button>
      <ul>
        {filteredServices.map((service) => (
          <li key={service.id}>{service.name} - {service.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServicePicker;
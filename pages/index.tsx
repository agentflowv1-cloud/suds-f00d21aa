import type { NextPage } from 'next';
import ServicePicker from '../components/ServicePicker';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Service Picker</h1>
      <ServicePicker />
    </div>
  );
};

export default Home;
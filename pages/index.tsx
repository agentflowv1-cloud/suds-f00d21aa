import type { NextPage } from 'next';
import Head from 'next/head';
import PaymentForm from '../components/PaymentForm';
import Services from '../components/Services';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Secure Payment System</title>
        <meta name="description" content="Book services and pay securely" />
      </Head>
      <h1>Secure Payment System</h1>
      <Services />
      <PaymentForm />
    </div>
  );
};

export default Home;
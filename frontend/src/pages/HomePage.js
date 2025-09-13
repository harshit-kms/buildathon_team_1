import React from 'react';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout title="Home">
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to TurtleFin</h1>
          <p className="text-gray-600">
            This is the home page. You can add any content you want here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
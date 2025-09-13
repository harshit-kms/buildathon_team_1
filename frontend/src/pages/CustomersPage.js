// src/pages/StatisticsPage.js
import React from 'react';
import Layout from '../components/Layout';

const CustomersPage = () => {
  return (
    <Layout title="Customers">
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Customers</h1>
          <p className="text-gray-600">
            View Customers' list here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default CustomersPage;
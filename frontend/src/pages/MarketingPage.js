import React from 'react';
import Layout from '../components/Layout';

const MarketingPage = () => {
  return (
    <Layout title="Home">
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">AI Marketing Assistant</h1>
          <p className="text-gray-600">
            This is the marketing page. 
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MarketingPage;
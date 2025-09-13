// src/pages/SettingsPage.js
import React from 'react';
import Layout from '../components/Layout';

const SettingsPage = () => {
  return (
    <Layout title="Settings">
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-gray-600">
            Manage your application settings here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
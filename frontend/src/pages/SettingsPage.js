import React, { useState } from 'react';
import Layout from '../components/Layout';

const ToggleSwitch = ({ enabled, onToggle, id }) => {
  return (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={enabled}
        onChange={onToggle}
        className="sr-only"
      />
      <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
        enabled ? 'bg-emerald-500' : 'bg-gray-300'
      }`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } mt-0.5 ml-0.5`}></div>
      </div>
    </label>
  );
};

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    renewalReminders: true,
    autoFollowUp: true,
    autoRenewalReminders: true,
    aiSentimentAnalysis: true
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = () => {
    // Handle save settings logic here
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    // Handle export data logic here
    console.log('Exporting data...');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle delete account logic here
      console.log('Account deletion requested');
    }
  };

  return (
    <Layout title="Settings">
      <div className="p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and application settings</p>
        </div>

        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Send us updates and alerts via email</p>
                </div>
                <ToggleSwitch
                  enabled={settings.emailNotifications}
                  onToggle={() => handleToggle('emailNotifications')}
                  id="email-notifications"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Get important alerts via SMS</p>
                </div>
                <ToggleSwitch
                  enabled={settings.smsNotifications}
                  onToggle={() => handleToggle('smsNotifications')}
                  id="sms-notifications"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Renewal Reminders</h3>
                  <p className="text-sm text-gray-500">Automatic notifications for policy renewals</p>
                </div>
                <ToggleSwitch
                  enabled={settings.renewalReminders}
                  onToggle={() => handleToggle('renewalReminders')}
                  id="renewal-reminders"
                />
              </div>
            </div>
          </div>

          {/* Language & Regional */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Language & Regional</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>India Standard Time</option>
                  <option>UTC</option>
                  <option>Eastern Time</option>
                  <option>Pacific Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Indian Rupee</option>
                  <option>US Dollar</option>
                  <option>Euro</option>
                  <option>British Pound</option>
                </select>
              </div>
            </div>
          </div>

          {/* Automation & AI */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Automation & AI</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Auto Follow-up Tasks</h3>
                  <p className="text-sm text-gray-500">Automatically create follow-up reminders</p>
                </div>
                <ToggleSwitch
                  enabled={settings.autoFollowUp}
                  onToggle={() => handleToggle('autoFollowUp')}
                  id="auto-followup"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Auto Renewal Reminders</h3>
                  <p className="text-sm text-gray-500">Send automatic renewal notifications</p>
                </div>
                <ToggleSwitch
                  enabled={settings.autoRenewalReminders}
                  onToggle={() => handleToggle('autoRenewalReminders')}
                  id="auto-renewal"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">AI Sentiment Analysis</h3>
                  <p className="text-sm text-gray-500">Analyze customer messages and sentiment automatically</p>
                </div>
                <ToggleSwitch
                  enabled={settings.aiSentimentAnalysis}
                  onToggle={() => handleToggle('aiSentimentAnalysis')}
                  id="ai-sentiment"
                />
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Public - Visible to everyone</option>
                  <option>Private - Only visible to me</option>
                  <option>Team - Visible to team members</option>
                </select>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Share Anonymous Analytics</h3>
                <p className="text-sm text-gray-500 mb-2">Help improve the system with your usage data</p>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">Allow anonymous usage analytics</span>
                </label>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
                <p className="text-sm text-gray-500 mb-3">Download all your data including customers, policies, and messages</p>
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200"
                >
                  Export Data
                </button>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Settings Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md font-medium transition-colors duration-200"
          >
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
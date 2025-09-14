import React, { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  X,
  Sparkles,
  Send,
  Calendar,
  BarChart3,
  Zap,
  Star
} from 'lucide-react';
import Layout from '../components/Layout';


const MarketingPage = () => {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Campaign Stats
  const [campaignStats] = useState({
    campaignsSent: 24,
    totalRecipients: 156,
    responseRate: 32,
    conversions: 18
  });

  // Recent Campaigns Data
  const [recentCampaigns] = useState([
    {
      id: 1,
      name: "Diwali Greetings 2024",
      sentTime: "2 hours ago",
      channel: "WhatsApp",
      recipients: 45,
      delivered: 43,
      responses: 12,
      responseRate: 27
    },
    {
      id: 2,
      name: "Health Policy Renewals",
      sentTime: "1 day ago",
      channel: "SMS",
      recipients: 28,
      delivered: 28,
      responses: 8,
      responseRate: 29
    },
    {
      id: 3,
      name: "Investment Plans Intro",
      sentTime: "3 days ago",
      channel: "WhatsApp",
      recipients: 35,
      delivered: 34,
      responses: 15,
      responseRate: 43
    }
  ]);

  // Campaign Templates
  const [templates] = useState([
    {
      id: 1,
      name: "Festival Greetings",
      category: "Seasonal",
      readTime: "2 min read",
      engagement: "High engagement",
      preview: "🎉 Happy {{festival_name}}! Wishing you and your family joy, prosperity, and good health. May this f...",
      bgColor: "border-teal-300 bg-teal-50 dark:border-teal-600 dark:bg-teal-900/20"
    },
    {
      id: 2,
      name: "Policy Renewal Reminder",
      category: "Renewal",
      readTime: "3 min read",
      engagement: "Very High engagement",
      preview: "Hi {{customer_name}}, This is a friendly reminder that your {{policy_type}} policy is due for renew...",
      bgColor: "border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20"
    },
    {
      id: 3,
      name: "Health Tips & Insurance",
      category: "Educational",
      readTime: "2 min read",
      engagement: "Medium engagement",
      preview: "☀️ Health Tip of the Week ☀️ Did you know that regular health check-ups can help detect issues earl...",
      bgColor: "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20"
    },
    {
      id: 4,
      name: "Investment Plan Introduction",
      category: "Investment",
      readTime: "2 min read",
      engagement: "High engagement",
      preview: "💰 Secure Your Financial Future Today! 💰 Are you looking for investment options that provide: ✅ Gu...",
      bgColor: "border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/20"
    }
  ]);

  const handleCreateCampaign = () => {
    setShowCreateCampaign(true);
    setSelectedStep(1);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSelectedStep(2);
  };

  const steps = [
    { number: 1, title: "Choose Template", active: selectedStep === 1 },
    { number: 2, title: "Compose Message", active: selectedStep === 2 },
    { number: 3, title: "Send Campaign", active: selectedStep === 3 }
  ];

  return (
    <Layout title = "Marketing">
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Campaign Builder</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">Create and send personalized campaigns to your customers</p>
        </div>
        
        <button 
          onClick={handleCreateCampaign}
          className="bg-teal-500 dark:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Sparkles className="w-5 h-5" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.campaignsSent}</h3>
          <p className="text-gray-600 dark:text-gray-400">Campaigns Sent</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.totalRecipients}</h3>
          <p className="text-gray-600 dark:text-gray-400">Total Recipients</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.responseRate}%</h3>
          <p className="text-gray-600 dark:text-gray-400">Response Rate</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{campaignStats.conversions}</h3>
          <p className="text-gray-600 dark:text-gray-400">Conversions</p>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Recent Campaigns</h2>
          <p className="text-gray-600 dark:text-gray-400">Your latest campaign performance</p>
        </div>
        
        <div className="space-y-6">
          {recentCampaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-teal-300 dark:hover:border-teal-600 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{campaign.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Sent {campaign.sentTime} via {campaign.channel}</p>
                </div>
                
                <div className="flex items-center space-x-8 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{campaign.recipients}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Recipients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{campaign.delivered}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Delivered</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{campaign.responses}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Responses</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{campaign.responseRate}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Rate</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Create New Campaign</h2>
              <button 
                onClick={() => setShowCreateCampaign(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      step.active 
                        ? 'bg-teal-500 text-white' 
                        : selectedStep > step.number 
                          ? 'bg-green-500 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                    }`}>
                      <span className="font-semibold">{step.number}</span>
                      <span>{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-px bg-gray-400 dark:bg-gray-600 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Choose Template */}
            {selectedStep === 1 && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${template.bgColor} hover:scale-[1.02]`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{template.name}</h3>
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          {template.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{template.readTime}</span>
                        <span className={`text-sm font-medium ${
                          template.engagement === 'Very High engagement' ? 'text-green-600 dark:text-green-400' :
                          template.engagement === 'High engagement' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'
                        }`}>
                          {template.engagement}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{template.preview}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Compose Message */}
            {selectedStep === 2 && selectedTemplate && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Message Editor */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Compose Your Message</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Name</label>
                        <input 
                          type="text" 
                          defaultValue={selectedTemplate.name}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message Content</label>
                        <textarea 
                          rows={8}
                          defaultValue={selectedTemplate.preview.replace('{{customer_name}}', '[Customer Name]').replace('{{festival_name}}', '[Festival Name]').replace('{{policy_type}}', '[Policy Type]')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Send Via</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input type="radio" name="channel" value="whatsapp" defaultChecked className="text-teal-500" />
                            <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">WhatsApp</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="channel" value="sms" className="text-teal-500" />
                            <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">SMS</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="channel" value="email" className="text-teal-500" />
                            <span className="ml-2 text-sm text-gray-900 dark:text-gray-100">Email</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Preview</h3>
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 min-h-[300px]">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 max-w-xs ml-auto">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {selectedTemplate.preview.replace('{{customer_name}}', 'Raj Patel').replace('{{festival_name}}', 'Diwali').replace('{{policy_type}}', 'Health Insurance')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                      <h4 className="font-medium text-teal-800 dark:text-teal-200 mb-2">AI Optimization Tips</h4>
                      <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-1">
                        <li>• Best time to send: 10:00 AM - 12:00 PM</li>
                        <li>• Expected response rate: {selectedTemplate.engagement === 'High engagement' ? '35-45%' : '25-35%'}</li>
                        <li>• Personalization will increase engagement by 20%</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button 
                    onClick={() => setSelectedStep(1)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800"
                  >
                    Back to Templates
                  </button>
                  <button 
                    onClick={() => setSelectedStep(3)}
                    className="px-6 py-2 bg-teal-500 dark:bg-teal-600 text-white rounded-lg hover:bg-teal-600 dark:hover:bg-teal-700"
                  >
                    Preview & Send
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Send Campaign */}
            {selectedStep === 3 && (
              <div className="p-6">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
                    <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ready to Send!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Your campaign will be sent to 45 recipients via WhatsApp</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">45</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Recipients</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">~38</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Expected Responses</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹125</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Cost</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => setSelectedStep(2)}
                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800"
                      >
                        Back to Edit
                      </button>
                      <button 
                        onClick={() => {
                          setShowCreateCampaign(false);
                          // Here you would typically send the campaign
                        }}
                        className="px-8 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 flex items-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Campaign Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default MarketingPage;
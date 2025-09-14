import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Target,
  HelpCircle,
  X,
  Trophy,
  Phone,
  Mail,
  MessageCircle,
  UserCheck,
  Calendar,
  Bot, 
  User, 
  Send,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  DollarSign,
  UserMinus,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const [showTooltip, setShowTooltip] = useState(null);
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);

  // Core KPIs data
  const coreKPIs = [
    {
      id: 'leads',
      title: 'Leads Generated',
      value: 47,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      help: 'Total number of new leads generated through all marketing channels including digital campaigns, referrals, and direct inquiries.'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: '22%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      help: 'Percentage of leads that converted into actual customers. This metric helps measure the effectiveness of your sales process.'
    },
    {
      id: 'response',
      title: 'Response Rate',
      value: '78%',
      change: '+4.8%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      help: 'Percentage of customers who responded to marketing campaigns within 24 hours. Higher rates indicate better engagement.'
    },
    {
      id: 'referrals',
      title: 'Referrals Generated',
      value: 8,
      change: '-2.1%',
      trend: 'down',
      icon: UserCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      help: 'Number of new customers acquired through existing customer referrals. Word-of-mouth is a powerful growth driver.'
    },
    {
      id: 'engagement',
      title: 'Engagement Rate',
      value: '24%',
      change: '+1.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      help: 'Average engagement rate across all digital channels including social media interactions, email opens, and campaign clicks.'
    }
  ];

  // Advanced Analytics KPIs
  const advancedKPIs = [
    {
      id: 'conversations',
      title: 'Active Conversations',
      value: 18,
      icon: MessageCircle,
      color: 'text-teal-600',
      help: 'Number of ongoing customer conversations across all channels that are currently active and awaiting response.'
    },
    {
      id: 'response-time',
      title: 'Avg Response Time',
      value: '1.5h',
      icon: Clock,
      color: 'text-blue-600',
      help: 'Average time taken to respond to customer inquiries across all communication channels.'
    },
    {
      id: 'repeat',
      title: 'Repeat Interactions',
      value: 12,
      badge: true,
      icon: RefreshCw,
      color: 'text-green-600',
      help: 'Number of customers who have had multiple touchpoints with your business, indicating strong engagement.'
    },
    {
      id: 'clv',
      title: 'CLV Estimate',
      value: '₹18,500',
      icon: DollarSign,
      color: 'text-purple-600',
      help: 'Customer Lifetime Value - estimated total revenue a customer will generate throughout their relationship with your business.'
    },
    {
      id: 'churn',
      title: 'Churn Rate',
      value: '8%',
      icon: UserMinus,
      color: 'text-orange-600',
      help: 'Percentage of customers who stopped engaging with your business over a specific period.'
    }
  ];

  // Chart data
  const leadsConversionData = [
    { month: 'Jul', leads: 42, conversions: 18 },
    { month: 'Aug', leads: 48, conversions: 28 },
    { month: 'Sep', leads: 39, conversions: 27 },
    { month: 'Oct', leads: 52, conversions: 31 },
    { month: 'Nov', leads: 45, conversions: 29 },
    { month: 'Dec', leads: 55, conversions: 35 }
  ];

  const weeklyEngagementData = [
    { day: 'Mon', rate: 18 },
    { day: 'Tue', rate: 21 },
    { day: 'Wed', rate: 25 },
    { day: 'Thu', rate: 19 },
    { day: 'Fri', rate: 28 },
    { day: 'Sat', rate: 16 },
    { day: 'Sun', rate: 14 }
  ];

  const leadSourcesData = [
    { name: 'WhatsApp', value: 35, color: '#10B981' },
    { name: 'Facebook', value: 28, color: '#3B82F6' },
    { name: 'Email', value: 15, color: '#F59E0B' },
    { name: 'Direct', value: 12, color: '#EF4444' },
    { name: 'Referrals', value: 10, color: '#8B5CF6' }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Rajesh Kumar', location: 'Mumbai', leads: 47, badge: '👑' },
    { rank: 2, name: 'Priya Sharma', location: 'Delhi', leads: 39, badge: '🥈' },
    { rank: 3, name: 'Amit Patel', location: 'Bangalore', leads: 34, badge: '🥉' },
  ];

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi Priya! I'm your ai assistant. How can I help you today?",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Great question! Let me help you with that.",
        "I'd recommend focusing on 'Advanced Objection Handling' since you're 90% complete. Finishing it will unlock your Silver certification!",
        "Your conversion rate has improved by 23%! This is likely due to applying the techniques from your completed lessons. Keep it up!",
        "For WhatsApp campaigns, check out the 'Digital Selling Mastery' course. It covers social selling strategies specifically for health insurance.",
        "Based on your progress, I suggest scheduling a 1:1 session with Rajesh Kumar. He specializes in sales strategy and has excellent reviews."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: chatMessages.length + 2,
        type: 'bot',
        message: randomResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTooltip = (kpiId) => {
    setShowTooltip(showTooltip === kpiId ? null : kpiId);
  };

  return (
    <Layout title="Dashboard">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Track your performance with dimensional insights and actionable data</p>
        </div>

        {/* Core KPIs Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-teal-600 font-medium">Last 7 days</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {coreKPIs.map((kpi) => {
              const IconComponent = kpi.icon;
              return (
                <div key={kpi.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${kpi.bgColor} dark:bg-gray-700`}>
                      <IconComponent className={`w-6 h-6 ${kpi.color} dark:text-gray-300`} />
                    </div>
                    <button
                      onClick={() => toggleTooltip(kpi.id)}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{kpi.title}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>

                  {/* Tooltip */}
                  {showTooltip === kpi.id && (
                    <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white p-4 rounded-xl shadow-lg z-10 -mt-2">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{kpi.title}</h4>
                        <button 
                          onClick={() => setShowTooltip(null)}
                          className="text-gray-300 hover:text-white ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{kpi.help}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>



        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Leads & Conversions Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Leads & Conversions Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsConversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#14B8A6" name="Leads Generated" />
                  <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lead Sources */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lead Sources</h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {leadSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {leadSourcesData.map((source, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Engagement Rate */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Engagement Rate</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#14B8A6" 
                    strokeWidth={3}
                    dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Trophy className="w-6 h-6 text-teal-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Regional Leaderboard</h3>
            </div>
            
            <div className="space-y-4">
              {leaderboardData.map((agent) => (
                <div key={agent.rank} className="flex text-left items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{agent.badge}</span>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">#{agent.rank}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{agent.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-teal-600">{agent.leads}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">leads</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-teal-800 dark:text-teal-200">You're ranked 3rd nationally</p>
                  <p className="text-xs text-teal-600 dark:text-teal-300">Keep up the great work!</p>
                </div>
                <div className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  TOP 10%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Analytics */ }
        <div className="mb-8">
          <button
            onClick={() => setShowAdvancedAnalytics(!showAdvancedAnalytics)}
            className="flex items-center space-x-3 mb-4 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors group"
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span className="text-lg font-semibold">Advanced Analytics</span>
              <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded-full font-medium">
                Tier 2
              </span>
            </div>
            {showAdvancedAnalytics ? (
              <ChevronUp className="w-5 h-5 transition-transform group-hover:scale-110" />
            ) : (
              <ChevronDown className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}
          </button>

          {showAdvancedAnalytics && (
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-800/10 rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-700/30 animate-in slide-in-from-top duration-300">
              {/* Advanced KPIs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {advancedKPIs.map((kpi) => {
                  const IconComponent = kpi.icon;
                  return (
                    <div key={kpi.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 relative group hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`w-4 h-4 ${kpi.color} dark:text-gray-300`} />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{kpi.title}</span>
                        </div>
                        <button
                          onClick={() => toggleTooltip(kpi.id)}
                          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <HelpCircle className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</span>
                        {kpi.badge && (
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {kpi.value}
                          </div>
                        )}
                      </div>

                      {/* Advanced Tooltip */}
                      {showTooltip === kpi.id && (
                        <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white p-3 rounded-xl shadow-lg z-20 -mt-2">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-xs">{kpi.title}</h4>
                            <button 
                              onClick={() => setShowTooltip(null)}
                              className="text-gray-300 hover:text-white ml-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">{kpi.help}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Time Saved via Automation */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Time Saved via Automation</h3>
                  </div>
                  <button
                    onClick={() => toggleTooltip('automation')}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      You saved <span className="font-bold text-gray-900 dark:text-white">6 hours</span> this week through automation. 
                      That's 6 more hours for relationship building.
                    </p>
                  </div>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4">
                    +6h saved
                  </div>
                </div>

                {/* Automation Tooltip */}
                {showTooltip === 'automation' && (
                  <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white p-4 rounded-xl shadow-lg z-20 -mt-2">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">Time Saved via Automation</h4>
                      <button 
                        onClick={() => setShowTooltip(null)}
                        className="text-gray-300 hover:text-white ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Total time saved through automated responses, follow-ups, and workflow optimizations. 
                      This metric helps you understand the efficiency gains from your automation setup.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Floating Chat Button */}
        <div className="fixed bottom-6 right-6 z-50">
          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 animate-pulse"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">AI Assistant</span>
            </button>
          )}
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
              onClick={() => setIsChatOpen(false)}
            />
            
            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              isChatOpen ? 'translate-x-0' : 'translate-x-full'
            } flex flex-col`}>
              {/* Chat Header */}
              <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <h3 className="font-semibold">AI Assistant</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="hover:bg-teal-600 p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === 'bot' ? 'bg-teal-100 dark:bg-teal-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        {msg.type === 'bot' ? (
                          <Bot className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        ) : (
                          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        msg.type === 'bot' 
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                          : 'bg-teal-500 text-white'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <span className={`text-xs mt-1 block ${
                          msg.type === 'bot' ? 'text-gray-500 dark:text-gray-400' : 'text-teal-100'
                        }`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;

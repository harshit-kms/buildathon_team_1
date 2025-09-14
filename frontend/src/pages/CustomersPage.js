import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  Star, 
  Target, 
  Zap, 
  MessageCircle, 
  Bot, 
  User, 
  X, 
  Send,
  Filter,
  Search,
  MoreVertical,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Layout from '../components/Layout';

const CustomerPage = () => {
  const [stats] = useState({
    totalCustomers: 156,
    activeLeads: 23,
    followUpsToday: 8,
    conversionRate: 34
  });

  const [customers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      status: "active",
      priority: "high",
      policies: ["Health Insurance", "Motor Insurance"],
      policyValue: 45000,
      followUp: "Tomorrow",
      lastContact: "2 days ago",
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Priya Patel",
      phone: "+91 87654 32109",
      email: "priya.patel@email.com",
      status: "prospect",
      priority: "medium",
      policies: ["Life Insurance"],
      policyValue: 25000,
      followUp: "Next week",
      lastContact: "1 week ago",
      avatar: "👩‍💼"
    },
    {
      id: 3,
      name: "Amit Sharma",
      phone: "+91 76543 21098",
      email: "amit.sharma@email.com",
      status: "active",
      priority: "high",
      policies: ["Health Insurance", "Life Insurance", "Investment Plan"],
      policyValue: 75000,
      followUp: "Today",
      lastContact: "3 days ago",
      avatar: "👨‍💻"
    },
    {
      id: 4,
      name: "Sunita Gupta",
      phone: "+91 65432 10987",
      email: "sunita.gupta@email.com",
      status: "inactive",
      priority: "low",
      policies: ["Motor Insurance"],
      policyValue: 15000,
      followUp: "This week",
      lastContact: "2 weeks ago",
      avatar: "👩‍🏫"
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      customer: "Rajesh Kumar",
      action: "Policy renewal discussion",
      time: "2 hours ago",
      type: "call"
    },
    {
      id: 2,
      customer: "Amit Sharma",
      action: "Sent investment plan proposal",
      time: "5 hours ago",
      type: "email"
    },
    {
      id: 3,
      customer: "Priya Patel",
      action: "Follow-up call scheduled",
      time: "1 day ago",
      type: "schedule"
    },
    {
      id: 4,
      customer: "Sunita Gupta",
      action: "Policy claim processed",
      time: "2 days ago",
      type: "claim"
    }
  ]);

  const [dailyTips] = useState([
    "Call back prospects within 2 hours to increase conversion by 60%",
    "Ask about family members to identify additional policy opportunities",
    "Send policy comparisons via WhatsApp for better engagement"
  ]);

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm your customer assistant. I can help you with customer insights, follow-up reminders, and sales tips!",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % dailyTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dailyTips.length]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponses = [
        "Based on your customer data, Rajesh Kumar has high policy value and is due for renewal. Consider calling him today!",
        "Amit Sharma hasn't been contacted in 3 days but has high priority. A follow-up call could lead to upselling opportunities.",
        "You have 8 follow-ups due today. Would you like me to prioritize them by policy value?",
        "Priya Patel shows medium priority but low engagement. Try sending a WhatsApp message with policy benefits.",
        "Your conversion rate is 34%! Focus on high-priority prospects like Rajesh and Amit to improve it further."
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'prospect': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'inactive': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'medium': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const filteredCustomers = filterStatus === 'all' 
    ? customers 
    : customers.filter(customer => customer.status === filterStatus);

  return (
    <Layout title="Customer Management">
      <div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Daily Tip Banner */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">💡 Today's Sales Tip</h3>
                  <p className="text-sm opacity-90">{dailyTips[currentTipIndex]}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {dailyTips.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTipIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer Overview</h2>
              <button className="w-40 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition-colors">
                Add Customer
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalCustomers}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Customers</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeLeads}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Leads</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.followUpsToday}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Follow-ups Today</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.conversionRate}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
              </div>
            </div>
          </div>

          {/* Customer List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer List</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="prospect">Prospect</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-2xl text-white flex-shrink-0">
                      {customer.avatar}
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{customer.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                            {customer.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(customer.priority)}`}>
                            {customer.priority} priority
                          </span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors" title="Call">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors" title="WhatsApp">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" title="Email">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors" title="More">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Contact Info */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Contact</h4>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                              {customer.phone}
                            </p>
                            <p className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                              {customer.email}
                            </p>
                          </div>
                        </div>
                        
                        {/* Policies */}
                        <div className="space-y-2 flex flex-col items-center text-center">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Policies</h4>
                          <div className="space-y-2">
                            <div className="flex flex-wrap justify-center gap-1">
                              {customer.policies.map((policy, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs px-2 py-1 rounded-md border border-teal-200 dark:border-teal-800"
                                >
                                  {policy}
                                </span>
                              ))}
                            </div>
                            <p className="font-bold text-lg text-gray-900 dark:text-white">₹{customer.policyValue.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {/* Follow-up */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">Follow-up</h4>
                          <div className="space-y-1">
                            <p className={`font-medium ${
                              customer.followUp === 'Today' ? 'text-red-600 dark:text-red-400' : 
                              customer.followUp === 'Tomorrow' ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {customer.followUp}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Last contact: {customer.lastContact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'call' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    activity.type === 'email' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'schedule' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    {activity.type === 'call' && <Phone className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
                    {activity.type === 'email' && <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'schedule' && <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                    {activity.type === 'claim' && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.customer}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        {/* <div className="fixed bottom-6 right-6 z-50">
          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 animate-pulse"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Customer Assistant</span>
            </button>
          )}
        </div> */}

        {/* Chat Sidebar */}
        {isChatOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
              onClick={() => setIsChatOpen(false)}
            />
            
            <div className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col transform translate-x-0 transition-transform duration-300 ease-in-out">
              <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <h3 className="font-semibold">Customer Assistant</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="hover:bg-teal-600 p-1 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

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

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about customers, follow-ups, etc..."
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

export default CustomerPage;

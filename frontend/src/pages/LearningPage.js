import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Star, 
  Award, 
  Users, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Zap, 
  ChevronRight, 
  MessageCircle, 
  Bot, 
  User, 
  X, 
  Send 
} from 'lucide-react';
import Layout from '../components/Layout';

const LearningPage = () => {
  const [user] = useState({
    name: "Priya Sharma",
    certification: "Bronze Seller Certified",
    completedLessons: 4,
    badges: ['🎓', '🏆', '💎'],
    nextLesson: "How to close leads from referrals"
  });

  const [coursesInProgress] = useState([
    {
      id: 1,
      title: "Sales Fundamentals for Health Insurance",
      subtitle: "Building trust and rapport with customers",
      progress: 75,
      duration: "4.5h",
      lessons: 12,
      icon: "📊",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Digital Selling Mastery",
      subtitle: "WhatsApp campaigns and social selling",
      progress: 45,
      duration: "3.2h",
      lessons: 8,
      icon: "📱",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Advanced Objection Handling",
      subtitle: "Turn objections into sales opportunities",
      progress: 90,
      duration: "2.8h",
      lessons: 10,
      icon: "🎯",
      color: "from-orange-500 to-red-600"
    }
  ]);

  const [skillTracks] = useState([
    {
      name: "Sales Basics",
      courses: 145,
      duration: "12h 30m",
      icon: "💼",
      description: "Building trust, first call tips",
      rating: 4.8,
      students: 1250
    },
    {
      name: "Advanced Selling",
      courses: 89,
      duration: "8h 45m",
      icon: "🚀",
      description: "Objection handling, upselling family plans",
      rating: 4.9,
      students: 892
    },
    {
      name: "Digital Selling",
      courses: 67,
      duration: "6h 20m",
      icon: "📲",
      description: "WhatsApp campaigns, social media selling",
      rating: 4.7,
      students: 634
    },
    {
      name: "CRM Mastery",
      courses: 52,
      duration: "5h 15m",
      icon: "⚡",
      description: "Using CRM + Sentiment Analysis effectively",
      rating: 4.8,
      students: 445
    }
  ]);

  const [topMentors] = useState([
    {
      name: "Rajesh Kumar",
      specialties: ["Sales Strategy", "Customer Relations"],
      courses: 125,
      rating: 4.9,
      students: 2140,
      avatar: "👨‍💼"
    },
    {
      name: "Anita Desai",
      specialties: ["Digital Marketing", "Lead Generation"],
      courses: 89,
      rating: 4.8,
      students: 1850,
      avatar: "👩‍💼"
    },
    {
      name: "Suresh Patel",
      specialties: ["Health Insurance", "Policy Explanation"],
      courses: 156,
      rating: 4.9,
      students: 2890,
      avatar: "👨‍⚕️"
    }
  ]);

  const [dailyTips] = useState([
    "Follow up within 30 minutes for 80% higher conversion rates",
    "Use customer's name 3 times during the call to build rapport",
    "Ask 'What concerns you most about health coverage?' to identify pain points"
  ]);

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi Priya! I'm your learning assistant. How can I help you today?",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
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

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Great question! Let me help you with that. You can continue your current course by clicking 'Continue Learning' on any course card.",
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
  return (
    <Layout title = "Learning">
    <div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Daily Tip Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">💡 Today's Pro Tip</h3>
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

        {/* Learning Progress Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Learning Snapshot</h2>
            
            <button className="w-40 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition-colors">
                Unlock Premium
            </button>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-indigo-600">{user.completedLessons}</p>
              <p className="text-sm text-gray-600">Lessons Completed</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-green-600">{user.certification}</p>
              <p className="text-sm text-gray-600">Current Level</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-600">{user.nextLesson}</p>
              <p className="text-xs text-gray-600">Next Suggested</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">+23%</p>
              <p className="text-sm text-gray-600">Conversion Rate</p>
            </div>
          </div>
        </div>

        {/* Courses in Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Courses In Progress</h2>
            {/* <a href="#" className="text-indigo-600 font-medium flex items-center hover:text-indigo-700">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesInProgress.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {course.icon}
                  </div>
                  <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Play className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.subtitle}</p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{course.progress}% Complete</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 bg-gradient-to-r ${course.color} rounded-full transition-all duration-300`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors">
                    Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Tracks */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Skill Tracks</h2>
              {/* <a href="#" className="text-indigo-600 font-medium flex items-center hover:text-indigo-700">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </a> */}
            </div>
            <div className="space-y-4">
              {skillTracks.map((track, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                      {track.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{track.name}</h3>
                      <p className="text-sm text-gray-600">{track.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{track.courses} Courses</span>
                        <span className="text-xs text-gray-500">{track.duration}</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{track.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">{track.students}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Mentors */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Top Mentors</h2>
              {/* <a href="#" className="text-indigo-600 font-medium flex items-center hover:text-indigo-700">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </a> */}
            </div>
            <div className="space-y-4">
              {topMentors.map((mentor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-teal-50 hover:border-teal-200 transition-colors cursor-pointer border border-transparent">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-2xl text-white">
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.specialties.join(", ")}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{mentor.courses} Courses</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">({mentor.rating})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">+{mentor.students}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
        <button
        onClick={() => setIsChatOpen(true)}
        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 animate-pulse"
        >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Insu Learning</span>
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
          <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isChatOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}>
            {/* Chat Header */}
            <div className="bg-teal-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">Insu Learn</h3>
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
                      msg.type === 'bot' ? 'bg-teal-100' : 'bg-blue-100'
                    }`}>
                      {msg.type === 'bot' ? (
                        <Bot className="w-4 h-4 text-teal-600" />
                      ) : (
                        <User className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      msg.type === 'bot' 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-teal-500 text-white'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <span className={`text-xs mt-1 block ${
                        msg.type === 'bot' ? 'text-gray-500' : 'text-teal-100'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your learning..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
    </Layout>
  );
};

export default LearningPage;
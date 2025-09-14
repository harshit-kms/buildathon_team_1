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
      color: "from-teal-500 to-teal-600",
      link : "https://youtu.be/3Iwba9DC70Q?feature=shared"
    },
    {
      id: 2,
      title: "Digital Selling Mastery",
      subtitle: "WhatsApp campaigns and social selling",
      progress: 45,
      duration: "3.2h",
      lessons: 8,
      icon: "📱",
      color: "from-teal-400 to-cyan-500",
      link : "https://youtu.be/3Iwba9DC70Q?feature=shared"

    },
    {
      id: 3,
      title: "Advanced Objection Handling",
      subtitle: "Turn objections into sales opportunities",
      progress: 90,
      duration: "2.8h",
      lessons: 10,
      icon: "🎯",
      color: "from-slate-600 to-slate-700",
      link : "https://youtu.be/3Iwba9DC70Q?feature=shared"
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
        {/* Welcome Section
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 dark:text-gray-300">Ready to boost your sales skills today?</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {user.badges.map((badge, index) => (
                  <span key={index} className="text-2xl">{badge}</span>
                ))}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-teal-600">{user.certification}</p>
                <p className="text-xs text-gray-500">{user.completedLessons} lessons completed</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Daily Tip Banner */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 mb-8 text-white">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Snapshot</h2>
            {/* <button className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
              Unlock Premium
            </button> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg">
              <BookOpen className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{user.completedLessons}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg text-white">
              <Award className="w-8 h-8 text-teal-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-teal-400">{user.certification}</p>
              <p className="text-sm text-gray-300">Current Level</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg">
              <Target className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-teal-600 dark:text-teal-400">{user.nextLesson}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Next Suggested</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg text-white">
              <TrendingUp className="w-8 h-8 text-teal-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-teal-400">35%</p>
              <p className="text-sm text-gray-300">Renewal Increase</p>
            </div>
          </div>
        </div>

        {/* Courses in Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Courses In Progress</h2>
            <a href="#" className="text-teal-600 font-medium flex items-center hover:text-teal-700">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesInProgress.map((course) => (
              <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all hover:border-teal-300 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {course.icon}
                  </div>
                  {/* <button className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors">
                    <Play className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </button> */}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{course.subtitle}</p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.progress}% Complete</span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">{course.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 bg-teal-500 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <a href = {`${course.link}%`}>
                <button className="w-full bg-slate-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                  Continue Learning
                </button>
                </a>
              </div>
            ))}
          </div>
        </div>
{/* Success Stories Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Success Stories</h2>
            <a href="#" className="text-teal-600 font-medium flex items-center hover:text-teal-700">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-teal-50 hover:border-teal-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-transparent">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                🏠
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Converting a Price-Focused Shopper</h3>
                  <div className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">home</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Used comparison charts to demonstrate value over price when customer focused only on cost
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">Mike D.</span>
                    <span className="text-xs text-gray-500">5 years experience</span>
                    <div className="flex items-center">
                      <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">₹800 additional premium</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    <span>+140%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-teal-50 hover:border-teal-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-transparent">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                🚗
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Turning Skeptical Customer into Advocate</h3>
                  <div className="bg-emerald-100 dark:bg-emerald-900/50 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">auto</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Built trust through education and validation, leading to customer and 3 family referrals
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">Sarah M.</span>
                    <span className="text-xs text-gray-500">3 years experience</span>
                    <div className="flex items-center">
                      <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">₹4,500 total business</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Users className="w-4 h-4 inline mr-1" />
                    <span>4 customers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-teal-50 hover:border-teal-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-transparent">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                ❤️
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Health Plan Family Upsell Success</h3>
                  <div className="bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-purple-700 dark:text-purple-300">health</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Identified family needs during renewal call, upgraded individual to family plan
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">Amit K.</span>
                    <span className="text-xs text-gray-500">2 years experience</span>
                    <div className="flex items-center">
                      <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">₹12,000 upgrade</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Target className="w-4 h-4 inline mr-1" />
                    <span>300%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Tracks */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skill Tracks</h2>
              <a href="#" className="text-teal-600 font-medium flex items-center hover:text-teal-700">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            <div className="space-y-4">
              {skillTracks.map((track, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-teal-50 hover:border-teal-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-transparent">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl shadow-sm border border-gray-100 dark:border-gray-600">
                      {track.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{track.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{track.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{track.courses} Courses</span>
                        <span className="text-xs text-gray-500">{track.duration}</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{track.rating}</span>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Mentors</h2>
              <a href="#" className="text-teal-600 font-medium flex items-center hover:text-teal-700">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            <div className="space-y-4">
              {topMentors.map((mentor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-teal-50 hover:border-teal-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-transparent">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-2xl text-white">
                      {mentor.avatar}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{mentor.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.specialties.join(", ")}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{mentor.courses} Courses</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">({mentor.rating})</span>
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

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 animate-pulse"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">InsuLearn</span>
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
                <h3 className="font-semibold">InsuLearn</h3>
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
                  placeholder="Ask me anything about your learning..."
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

export default LearningPage;
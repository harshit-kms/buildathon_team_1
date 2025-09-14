import React, { useState } from 'react';
import { 
  Users, 
  Share2, 
  Trophy, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Gift, 
  Plus,
  Star,
  UserPlus,
  BarChart3,
  Target,
  Award,
  Phone,
  Calendar
} from 'lucide-react';
import Layout from '../components/Layout';


const ReferralPage = () => {
  const [activeTab, setActiveTab] = useState('referrals');
  
  // Referral System Data
  const [referralStats] = useState({
    totalReferrals: 12,
    converted: 8,
    conversionRate: 67,
    rewardsEarned: 4500
  });

  const [referrals] = useState([
    {
      id: 1,
      name: "Ankit Mehta",
      phone: "+91 98765 43210",
      type: "Health Insurance - Cross referral",
      status: "Converted",
      commission: 1500,
      date: "10/15/2024",
      referredBy: "Partner: Rajesh Kumar"
    },
    {
      id: 2,
      name: "Swati Patel",
      phone: "+91 87654 32109",
      type: "Motor Insurance - Partner lead",
      status: "Contacted",
      commission: 0,
      date: "10/20/2024",
      referredBy: "Partner: Priya Sharma"
    }
  ]);

  // Partner Network Data
  const [partnerStats] = useState({
    partnerAgents: 28,
    businessShared: 18,
    pendingConnections: 8,
    partnershipRevenue: 12000
  });

  const [partnerBusiness] = useState([
    {
      id: 1,
      name: "Ankit Mehta",
      phone: "+91 98765 43210",
      type: "Health Insurance - Cross referral",
      status: "Converted",
      commission: 1500,
      date: "10/15/2024",
      partner: "Rajesh Kumar"
    },
    {
      id: 2,
      name: "Swati Patel",
      phone: "+91 87654 32109",
      type: "Motor Insurance - Partner lead",
      status: "Contacted",
      commission: "Pending",
      date: "10/20/2024",
      partner: "Priya Sharma"
    }
  ]);

  const [topPartners] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      initials: "PS",
      partnerships: 28,
      revenue: 15000,
      rating: 4.9
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      initials: "RK",
      partnerships: 24,
      revenue: 12500,
      rating: 4.8
    },
    {
      id: 3,
      name: "Amit Patel",
      initials: "AP",
      partnerships: 22,
      revenue: 11000,
      rating: 4.7
    },
    {
      id: 4,
      name: "Sunita Gupta",
      initials: "SG",
      partnerships: 19,
      revenue: 9500,
      rating: 4.6
    }
  ]);

  const [partnershipTiers] = useState([
    {
      name: "Bronze Partner",
      range: "1-5 partners",
      reward: 500,
      color: "from-orange-400 to-orange-500",
      icon: "🥉"
    },
    {
      name: "Silver Partner",
      range: "6-15 partners",
      reward: 750,
      color: "from-gray-400 to-gray-500",
      icon: "🥈"
    },
    {
      name: "Gold Partner",
      range: "16-30 partners",
      reward: 1000,
      color: "from-yellow-400 to-yellow-500",
      icon: "🥇"
    },
    {
      name: "Platinum Partner",
      range: "30+ partners",
      reward: 1500,
      color: "from-purple-400 to-purple-500",
      icon: "💎"
    }
  ]);

  return (
    <Layout title = "Referrals">
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {activeTab === 'referrals' ? 'Referral System' : 'Partner Network 🤝'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {activeTab === 'referrals' 
              ? 'Track your referrals and earn rewards' 
              : 'Connect with other agents and grow your business through partnerships'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'referrals'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Referrals
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'partners'
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Partners
          </button>
          {activeTab === 'partners' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share My Profile</span>
            </button>
          )}
          <button className="bg-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-600 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>{activeTab === 'referrals' ? 'Add Referral' : 'Connect Partner'}</span>
          </button>
        </div>
      </div>

      {/* Referrals Tab */}
      {activeTab === 'referrals' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{referralStats.totalReferrals}</h3>
              <p className="text-sm text-gray-500">Total Referrals</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{referralStats.converted}</h3>
              <p className="text-sm text-gray-500">Converted</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{referralStats.conversionRate}%</h3>
              <p className="text-sm text-gray-500">Conversion Rate</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">₹{referralStats.rewardsEarned}</h3>
              <p className="text-sm text-gray-500">Rewards Earned</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* All Referrals */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">All Referrals</h2>
              
              {referrals.length > 0 ? (
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{referral.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              referral.status === 'Converted' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {referral.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <p>Via: {referral.referredBy}</p>
                            <p>Phone: {referral.phone}</p>
                            <p>Type: {referral.type}</p>
                            <p>Date: {referral.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {referral.status === 'Converted' ? (
                            <p className="text-lg font-bold text-green-600">₹{referral.commission}</p>
                          ) : (
                            <p className="text-sm text-gray-500">Pending</p>
                          )}
                          <p className="text-xs text-gray-400">Commission</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <button className="bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition-colors">
                      Add Your First Referral
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No referrals yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Start referring customers to earn rewards and build your network.
                  </p>
                  <button className="bg-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-600 transition-colors">
                    Add Your First Referral
                  </button>
                </div>
              )}
            </div>

            {/* Achievement Progress */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Achievement Progress</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress to Gold Badge</span>
                      <span className="text-sm text-gray-500">{referralStats.totalReferrals}/50</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(referralStats.totalReferrals / 50) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {50 - referralStats.totalReferrals} more referrals needed for Gold Badge
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Silver Badge (25 referrals)</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Bronze Badge (10 referrals)</span>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Rewards Summary</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹2,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Earned</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{referralStats.rewardsEarned}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Next Payout</span>
                    <span className="font-semibold text-teal-600">₹1,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partners Tab */}
      {activeTab === 'partners' && (
        <div className="space-y-8">
          {/* Partner Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <Share2 className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{partnerStats.partnerAgents}</h3>
              <p className="text-sm text-gray-500">Partner Agents</p>
              <p className="text-xs text-teal-600 mt-1">+6 this month</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{partnerStats.businessShared}</h3>
              <p className="text-sm text-gray-500">Business Shared</p>
              <p className="text-xs text-green-600 mt-1">+4 this month</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{partnerStats.pendingConnections}</h3>
              <p className="text-sm text-gray-500">Pending Connections</p>
              <p className="text-xs text-orange-600 mt-1">Follow up needed</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">₹{partnerStats.partnershipRevenue}</h3>
              <p className="text-sm text-gray-500">Partnership Revenue</p>
              <p className="text-xs text-purple-600 mt-1">This quarter</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Partner Business */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Partner Business</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track business shared through your agent network</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {partnerBusiness.map((business) => (
                  <div key={business.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{business.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            business.status === 'Converted' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {business.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>Via: Partner: {business.partner}</p>
                          <p>Phone: {business.phone}</p>
                          <p>Type: {business.type}</p>
                          <p>Date: {business.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {business.status === 'Converted' ? (
                          <p className="text-lg font-bold text-green-600">₹{business.commission}</p>
                        ) : (
                          <p className="text-sm text-gray-500">{business.commission}</p>
                        )}
                        <p className="text-xs text-gray-400">Commission</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Partners */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>Top Partners</span>
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Most active agents in your network</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {topPartners.map((partner, index) => (
                  <div key={partner.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-400">{index + 1}</span>
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {partner.initials}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{partner.name}</h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                          <span>{partner.partnerships} partnerships</span>
                          <span>•</span>
                          <span>₹{partner.revenue}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partnership Tiers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Gift className="w-5 h-5 text-teal-600" />
                <span>Partnership Tiers</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Earn more as you build your agent network</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipTiers.map((tier, index) => (
                <div key={index} className="text-center p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-teal-300 transition-colors">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-3xl">{tier.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tier.range}</p>
                  <p className="text-lg font-bold text-teal-600">₹{tier.reward} per business shared</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Partnership Tools</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Build and manage your agent network</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-black text-center">
                <Share2 className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Share Profile</h3>
                <p className="text-sm opacity-90 mb-4">Share your profile with potential partners</p>
                <button className="bg-black text-yellow-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Share Now
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-black text-center">
                <UserPlus className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Find Partners</h3>
                <p className="text-sm opacity-90 mb-4">Discover and connect with other agents</p>
                <button className="bg-black text-yellow-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Find Partners
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-black text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Partnership Analytics</h3>
                <p className="text-sm opacity-90 mb-4">Track your partnership performance</p>
                <button className="bg-black text-yellow-400 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default ReferralPage;
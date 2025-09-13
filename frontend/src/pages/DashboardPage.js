import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const { dashboardData, loading, error } = useDashboard();

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center h-full">
          <div className="text-red-600 text-center">
            <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('₹', '₹ ');
  };

  const formatCrores = (amount) => {
    return `₹ ${(amount / 10000000).toFixed(0)} Cr`;
  };

  return (
    <Layout title="Dashboard">
      <div className="p-8">
        {/* Top Row - Revenue Chart and Premium Increase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Revenue Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCrores(dashboardData?.netPremium || 0)}
                </h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  +{dashboardData?.premiumGrowth || 0}%
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Net</h4>
                <h4 className="text-lg font-semibold text-gray-800">Premium</h4>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-32 flex items-end justify-between mb-4">
              <div className="flex items-end space-x-8">
                {dashboardData?.monthlyData?.map((item, index) => (
                  <div 
                    key={index} 
                    className="w-16 border-b-2 border-teal-400 relative"
                    style={{ height: `${(item.value / Math.max(...dashboardData.monthlyData.map(d => d.value))) * 100}px` }}
                  >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 bg-teal-400 rounded-full h-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              {dashboardData?.monthlyData?.map((item, index) => (
                <span key={index}>{item.month}</span>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Premium Increase Card */}
          <div className="bg-gray-900 text-white rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-4xl font-bold text-teal-400 mb-2">
                {dashboardData?.renewalIncrease || 0}%
              </div>
              <div className="text-sm text-gray-300 mb-1">increase</div>
              <div className="text-sm text-gray-300 mb-6">in renewals</div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors">
                Get Now
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
          </div>
        </div>

        {/* Bottom Row - Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* NCCD by Months */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">NCCD by Months</p>
            <div className="text-2xl font-bold text-gray-900 mb-4">
              {formatCurrency(dashboardData?.nccdByMonths?.value || 0).replace('₹ ', '₹ ').replace(',00', 'K')}
            </div>
            <div className="flex items-center space-x-1 mb-4">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span className="text-sm text-gray-600">
                +{dashboardData?.nccdByMonths?.growth || 0}%
              </span>
            </div>
            <div className="flex items-end space-x-2 h-12">
              {dashboardData?.nccdByMonths?.chartData?.map((height, i) => (
                <div 
                  key={i} 
                  className={`w-4 rounded-sm ${i === 2 ? 'bg-teal-500' : 'bg-gray-200'}`}
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Premium by Insurer */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Premium</p>
            <p className="text-sm text-gray-500 mb-4">by insurer</p>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#14b8a6" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeDasharray={`${(dashboardData?.premiumByInsurer?.percentage || 0) * 2.51} ${(100 - (dashboardData?.premiumByInsurer?.percentage || 0)) * 2.51}`} 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">
                    {(dashboardData?.premiumByInsurer?.value || 0) / 1000}k
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* New Leads */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {dashboardData?.newLeads?.count || 0}
            </div>
            <p className="text-sm text-gray-500 mb-4">New leads</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full" 
                style={{ width: `${dashboardData?.newLeads?.progress || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Active Branches */}
          <div className="bg-teal-500 text-white rounded-xl p-6">
            <p className="text-sm text-teal-100 mb-2">Active Branches</p>
            <div className="text-2xl font-bold mb-4">
              {dashboardData?.activeBranches?.count || 0}
            </div>
            <div className="flex items-end space-x-2 h-12 mb-4">
              {dashboardData?.activeBranches?.chartData?.map((height, i) => (
                <div 
                  key={i} 
                  className="w-3 bg-white opacity-70 rounded-sm"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-xl">
                <span className="text-2xl font-bold">
                  {dashboardData?.activeBranches?.percentage || 0}%
                </span>
              </div>
              <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
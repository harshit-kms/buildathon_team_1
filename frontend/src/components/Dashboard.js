// import React from 'react';
// import { Home, BarChart3, PieChart, Settings, TrendingUp, Users, ArrowRight, Plus } from 'lucide-react';
// import { useDashboard } from '../hooks/useDashboard';
// import { useAuth } from '../context/AuthContext';

// const Dashboard = () => {
//   const { dashboardData, loading, error } = useDashboard();
//   const { user, logout } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-600">{error}</div>
//       </div>
//     );
//   }

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount).replace('₹', '₹ ');
//   };

//   const formatCrores = (amount) => {
//     return `₹ ${(amount / 10000000).toFixed(0)} Cr`;
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg">
//         <div className="p-6">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
//               <div className="w-4 h-4 bg-white rounded-sm"></div>
//             </div>
//             <span className="text-xl font-bold text-gray-800">turtlefin</span>
//           </div>
//         </div>
        
//         <nav className="mt-8">
//           <div className="px-4 space-y-2">
//             <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//               <Home size={20} />
//               <span>Home</span>
//             </a>
//             <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//               <BarChart3 size={20} />
//               <span>Reports</span>
//             </a>
//             <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-teal-100 text-teal-700 rounded-lg">
//               <PieChart size={20} />
//               <span>Dashboard</span>
//             </a>
//             <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//               <TrendingUp size={20} />
//               <span>Statistics</span>
//             </a>
//             <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//               <Settings size={20} />
//               <span>Settings</span>
//             </a>
//           </div>
//         </nav>

//         <div className="absolute bottom-4 left-4 right-4">
//           <button 
//             onClick={logout}
//             className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <div className="bg-white shadow-sm border-b px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Users className="text-gray-400" size={24} />
//               <span className="text-xl font-semibold text-gray-800">
//                 Hello {user?.name}
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <input 
//                 type="search" 
//                 placeholder="Search" 
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Content */}
//         <div className="p-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
//             {/* Revenue Chart Card */}
//             <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900">
//                     {formatCrores(dashboardData?.netPremium || 0)}
//                   </h3>
//                   <p className="text-sm text-gray-500 flex items-center mt-1">
//                     <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
//                     +{dashboardData?.premiumGrowth || 0}%
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-lg font-semibold text-gray-800">Net</h4>
//                   <h4 className="text-lg font-semibold text-gray-800">Premium</h4>
//                 </div>
//               </div>
              
//               {/* Chart Area */}
//               <div className="h-32 flex items-end justify-between mb-4">
//                 <div className="flex items-end space-x-8">
//                   {dashboardData?.monthlyData?.map((item, index) => (
//                     <div 
//                       key={index} 
//                       className="w-16 border-b-2 border-teal-400 relative"
//                       style={{ height: `${(item.value / Math.max(...dashboardData.monthlyData.map(d => d.value))) * 100}px` }}
//                     >
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 bg-teal-400 rounded-full h-full"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="flex justify-between text-sm text-gray-500">
//                 {dashboardData?.monthlyData?.map((item, index) => (
//                   <span key={index}>{item.month}</span>
//                 ))}
//               </div>
              
//               <div className="mt-4 flex justify-end">
//                 <button className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
//                   <ArrowRight size={16} />
//                 </button>
//               </div>
//             </div>

//             {/* Premium Increase Card */}
//             <div className="bg-gray-900 text-white rounded-xl p-6 relative overflow-hidden">
//               <div className="relative z-10">
//                 <div className="text-4xl font-bold text-teal-400 mb-2">
//                   {dashboardData?.renewalIncrease || 0}%
//                 </div>
//                 <div className="text-sm text-gray-300 mb-1">increase</div>
//                 <div className="text-sm text-gray-300 mb-6">in renewals</div>
//                 <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-medium transition-colors">
//                   Get Now
//                 </button>
//               </div>
//               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
//             </div>
//           </div>

//           {/* Bottom Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
//             {/* NCCD by Months */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <p className="text-sm text-gray-500 mb-2">NCCD by Months</p>
//               <div className="text-2xl font-bold text-gray-900 mb-4">
//                 {formatCurrency(dashboardData?.nccdByMonths?.value || 0).replace('₹ ', '₹ ').replace(',00', 'K')}
//               </div>
//               <div className="flex items-center space-x-1 mb-4">
//                 <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
//                 <span className="text-sm text-gray-600">
//                   +{dashboardData?.nccdByMonths?.growth || 0}%
//                 </span>
//               </div>
//               <div className="flex items-end space-x-2 h-12">
//                 {dashboardData?.nccdByMonths?.chartData?.map((height, i) => (
//                   <div 
//                     key={i} 
//                     className={`w-4 rounded-sm ${i === 2 ? 'bg-teal-500' : 'bg-gray-200'}`}
//                     style={{ height: `${height}%` }}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             {/* Premium by Insurer */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <p className="text-sm text-gray-500 mb-2">Premium</p>
//               <p className="text-sm text-gray-500 mb-4">by insurer</p>
//               <div className="flex items-center justify-center mb-4">
//                 <div className="relative w-20 h-20">
//                   <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
//                     <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
//                     <circle 
//                       cx="50" 
//                       cy="50" 
//                       r="40" 
//                       stroke="#14b8a6" 
//                       strokeWidth="8" 
//                       fill="none" 
//                       strokeDasharray={`${(dashboardData?.premiumByInsurer?.percentage || 0) * 2.51} ${(100 - (dashboardData?.premiumByInsurer?.percentage || 0)) * 2.51}`} 
//                       strokeLinecap="round" 
//                     />
//                   </svg>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-lg font-bold text-gray-900">
//                       {(dashboardData?.premiumByInsurer?.value || 0) / 1000}k
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* New Leads */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="text-2xl font-bold text-gray-900 mb-2">
//                 {dashboardData?.newLeads?.count || 0}
//               </div>
//               <p className="text-sm text-gray-500 mb-4">New leads</p>
//               <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                 <div 
//                   className="bg-yellow-400 h-2 rounded-full" 
//                   style={{ width: `${dashboardData?.newLeads?.progress || 0}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Active Branches */}
//             <div className="bg-teal-500 text-white rounded-xl p-6">
//               <p className="text-sm text-teal-100 mb-2">Active Branches</p>
//               <div className="text-2xl font-bold mb-4">
//                 {dashboardData?.activeBranches?.count || 0}
//               </div>
//               <div className="flex items-end space-x-2 h-12 mb-4">
//                 {dashboardData?.activeBranches?.chartData?.map((height, i) => (
//                   <div 
//                     key={i} 
//                     className="w-3 bg-white opacity-70 rounded-sm"
//                     style={{ height: `${height}%` }}
//                   ></div>
//                 ))}
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-xl">
//                   <span className="text-2xl font-bold">
//                     {dashboardData?.activeBranches?.percentage || 0}%
//                   </span>
//                 </div>
//                 <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
//                   <Plus size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
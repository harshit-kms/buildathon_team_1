const mongoose = require('mongoose');

const dashboardSchema = mongoose.Schema({
  netPremium: {
    type: Number,
    required: true
  },
  premiumGrowth: {
    type: Number,
    required: true
  },
  renewalIncrease: {
    type: Number,
    required: true
  },
  nccdByMonths: {
    value: Number,
    growth: Number,
    chartData: [Number]
  },
  premiumByInsurer: {
    value: Number,
    percentage: Number
  },
  newLeads: {
    count: Number,
    progress: Number
  },
  activeBranches: {
    count: Number,
    percentage: Number,
    chartData: [Number]
  },
  monthlyData: [{
    month: String,
    value: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
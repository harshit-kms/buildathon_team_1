// routes/dashboard.js
const express = require('express');
const Dashboard = require('../models/Dashboard');
const { protect } = require('../middleware/auth'); // ADD THIS LINE AT THE TOP
const router = express.Router();

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private (now protected with middleware)
router.get('/', protect, async (req, res) => { // ADD 'protect' HERE
  try {
    let dashboard = await Dashboard.findOne().sort({ createdAt: -1 });
    
    // If no data exists, create sample data
    if (!dashboard) {
      dashboard = await Dashboard.create({
        netPremium: 35800000000, // 358 Cr
        premiumGrowth: 12.4,
        renewalIncrease: 35,
        nccdByMonths: {
          value: 800000, // 800K
          growth: 2.31,
          chartData: [20, 35, 25, 40, 30, 45, 35]
        },
        premiumByInsurer: {
          value: 12000, // 12k
          percentage: 75
        },
        newLeads: {
          count: 182,
          progress: 40
        },
        activeBranches: {
          count: 300,
          percentage: 75,
          chartData: [30, 45, 35, 50, 40, 60]
        },
        monthlyData: [
          { month: 'Jan', value: 25000000000 },
          { month: 'Feb', value: 28000000000 },
          { month: 'Mar', value: 32000000000 },
          { month: 'Apr', value: 30000000000 },
          { month: 'May', value: 35800000000 }
        ]
      });
    }

    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update dashboard data
// @route   PUT /api/dashboard
// @access  Private (now protected with middleware)
router.put('/', protect, async (req, res) => { // ADD 'protect' HERE
  try {
    const dashboard = await Dashboard.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Dashboard = require("../models/Dashboard");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Dashboard.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: "Admin",
      email: "admin@turtlefin.com",
      password: "1",
      role: "admin",
    });

    // Create dashboard data
    await Dashboard.create({
      netPremium: 35800000000, // 358 Cr
      premiumGrowth: 12.4,
      renewalIncrease: 35,
      nccdByMonths: {
        value: 800000, // 800K
        growth: 2.31,
        chartData: [20, 35, 25, 40, 30, 45, 35],
      },
      premiumByInsurer: {
        value: 12000, // 12k
        percentage: 75,
      },
      newLeads: {
        count: 182,
        progress: 40,
      },
      activeBranches: {
        count: 300,
        percentage: 75,
        chartData: [30, 45, 35, 50, 40, 60],
      },
      monthlyData: [
        { month: "Jan", value: 25000000000 },
        { month: "Feb", value: 28000000000 },
        { month: "Mar", value: 32000000000 },
        { month: "Apr", value: 30000000000 },
        { month: "May", value: 35800000000 },
      ],
    });

    console.log("Data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();

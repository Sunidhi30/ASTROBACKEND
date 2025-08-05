
const mongoose = require('mongoose');


// models/Analytics.js
const analyticsSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: {
      type: String,
      required: true,
      enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    
    // User Metrics
    userMetrics: {
      totalUsers: Number,
      newUsers: Number,
      activeUsers: Number,
      premiumUsers: Number,
      userRetentionRate: Number
    },
    
    // Service Metrics
    serviceMetrics: {
      totalOrders: Number,
      completedOrders: Number,
      cancelledOrders: Number,
      averageOrderValue: Number,
      popularServices: [String]
    },
    
    // Revenue Metrics
    revenueMetrics: {
      totalRevenue: Number,
      serviceWiseRevenue: mongoose.Schema.Types.Mixed,
      refundAmount: Number,
      netRevenue: Number,
      averageRevenuePerUser: Number
    },
    
    // Performance Metrics
    performanceMetrics: {
      averageCompletionTime: Number,
      averageRating: Number,
      customerSatisfactionScore: Number,
      practitionerUtilization: Number
    },
    
    // System Metrics
    systemMetrics: {
      apiCalls: Number,
      errorRate: Number,
      responseTime: Number,
      uptime: Number
    }
    
  }, { timestamps: true });
  
  // Create compound index for efficient querying
  analyticsSchema.index({ date: 1, type: 1 }, { unique: true });
  
  module.exports = mongoose.model('Analytics', analyticsSchema);
  
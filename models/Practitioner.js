const mongoose = require('mongoose');

// models/Practitioner.js
const practitionerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Professional Information
    specializations: [{
      type: String,
      enum: ['energy-reading', 'astrology', 'vastu', 'manifestation', 'wealth', 'numerology']
    }],
    experience: Number, // years
    qualifications: [String],
    certifications: [{
      name: String,
      issuer: String,
      date: Date,
      documentUrl: String
    }],
    
    // Profile
    bio: String,
    languages: [String],
    expertise: [String],
    
    // Availability
    availability: {
      monday: { available: Boolean, slots: [String] },
      tuesday: { available: Boolean, slots: [String] },
      wednesday: { available: Boolean, slots: [String] },
      thursday: { available: Boolean, slots: [String] },
      friday: { available: Boolean, slots: [String] },
      saturday: { available: Boolean, slots: [String] },
      sunday: { available: Boolean, slots: [String] }
    },
    timezone: String,
    
    // Performance Metrics
    totalOrdersCompleted: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    averageCompletionTime: Number, // in hours
    
    // Current Workload
    activeOrders: { type: Number, default: 0 },
    maxConcurrentOrders: { type: Number, default: 5 },
    
    // Status
    status: {
      type: String,
      enum: ['active', 'inactive', 'on-break', 'suspended'],
      default: 'active'
    },
    
    // Financial
    commissionRate: { type: Number, default: 70 }, // percentage
    totalEarnings: { type: Number, default: 0 },
    pendingPayouts: { type: Number, default: 0 },
    
    // Quality Metrics
    qualityScore: { type: Number, default: 100 },
    warningsCount: { type: Number, default: 0 },
    lastWarningDate: Date
    
  }, { timestamps: true });
  
  module.exports = mongoose.model('Practitioner', practitionerSchema);
  
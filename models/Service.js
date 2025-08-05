const mongoose = require('mongoose');
// models/Service.js
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
      type: String, 
      required: true,
      enum: ['energy-reading', 'astrology', 'vastu', 'manifestation', 'wealth']
    },
    subcategory: String,
    
    // Pricing
    basePrice: { type: Number, required: true },
    discountedPrice: Number,
    currency: { type: String, default: 'INR' },
    
    // Service Details
    duration: String, // e.g., "2-3 days", "1 hour"
    deliveryMode: [{ 
      type: String, 
      enum: ['pdf', 'call', 'chat', 'video', 'email', 'site-visit'] 
    }],
    
    // Requirements
    requiredInfo: {
      birthDetails: { type: Boolean, default: false },
      photos: { type: Boolean, default: false },
      questions: [String],
      documents: [String]
    },
    
    // Service Configuration
    isActive: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    maxOrdersPerDay: Number,
    
    // SEO & Display
    slug: { type: String, unique: true },
    metaTitle: String,
    metaDescription: String,
    tags: [String],
    images: [String],
    
    // Statistics
    totalOrders: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    
    // Practitioner Assignment
    assignedPractitioners: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    autoAssign: { type: Boolean, default: true }
    
  }, { timestamps: true });
  
  module.exports = mongoose.model('Service', serviceSchema);
  
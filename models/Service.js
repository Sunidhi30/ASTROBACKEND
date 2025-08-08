// const mongoose = require('mongoose');
// // models/Service.js
// const serviceSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     category: { 
//       type: String, 
//       required: true,
//       enum: ['energy-reading', 'astrology', 'vastu', 'manifestation', 'wealth']
//     },
//     subcategory: String,
    
//     // Pricing
//     basePrice: { type: Number, required: true },
//     discountedPrice: Number,
//     currency: { type: String, default: 'INR' },
    
//     // Service Details
//     duration: String, // e.g., "2-3 days", "1 hour"
//     deliveryMode: [{ 
//       type: String, 
//       enum: ['pdf', 'call', 'chat', 'video', 'email', 'site-visit'] 
//     }],
    
//     // Requirements
//     requiredInfo: {
//       birthDetails: { type: Boolean, default: false },
//       photos: { type: Boolean, default: false },
//       questions: [String],
//       documents: [String]
//     },
    
//     // Service Configuration
//     isActive: { type: Boolean, default: true },
//     isPopular: { type: Boolean, default: false },
//     isFeatured: { type: Boolean, default: false },
//     maxOrdersPerDay: Number,
    
//     // SEO & Display
//     slug: { type: String, unique: true },
//     metaTitle: String,
//     metaDescription: String,
//     tags: [String],
//     images: [String],
    
//     // Statistics
//     totalOrders: { type: Number, default: 0 },
//     averageRating: { type: Number, default: 0 },
//     totalReviews: { type: Number, default: 0 },
    
//     // Practitioner Assignment
//     assignedPractitioners: [{ 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'User' 
//     }],
//     autoAssign: { type: Boolean, default: true }
    
//   }, { timestamps: true });
  
//   module.exports = mongoose.model('Service', serviceSchema);
  // Services Schema
  const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['energy', 'astrology', 'vastu', 'manifestation', 'material', 'calculators']
  },
  subCategory: String,
  
  description: {
    short: String,
    detailed: String,
    benefits: [String],
    suitableFor: [String]
  },
  
  pricing: {
    basePrice: { type: Number, required: true },
    discountedPrice: Number,
    currency: { type: String, default: 'INR' }
  },
  
  deliveryInfo: {
    type: { type: String, enum: ['pdf', 'call', 'both'], required: true },
    timeline: String, // "3-5 working days"
    addOnCallPrice: Number, // If applicable
    addOnCallDuration: Number // In minutes
  },
  
  formFields: [{
    fieldName: String,
    fieldType: { type: String, enum: ['text', 'textarea', 'select', 'file', 'date', 'checkbox'] },
    label: String,
    required: { type: Boolean, default: false },
    options: [String], // For select fields
    validation: Schema.Types.Mixed
  }],
  
  isActive: { type: Boolean, default: true },
  isFree: { type: Boolean, default: false },
  requiresBirthDetails: { type: Boolean, default: false },
  
  // SEO & Display
  tags: [String],
  featured: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Dynamic Forms Schema
const formSubmissionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  
  formData: Schema.Types.Mixed, // Dynamic form data
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    uploadedAt: Date
  }],
  
  status: { 
    type: String, 
    enum: ['submitted', 'under_review', 'completed'], 
    default: 'submitted' 
  },
  
  adminNotes: String,
  
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Service', serviceSchema);

const mongoose = require('mongoose');

  // models/Order.js
  const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    
    // Order Details
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'refunded'],
      default: 'pending'
    },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    
    // Pricing
    baseAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    
    // Payment
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentMethod: String,
    paymentId: String,
    refundId: String,
    
    // Service Specific Data
    serviceData: {
      // For Energy Reading
      questionType: String,
      specificQuestion: String,
      situationDescription: String,
      uploadedFiles: [String],
      
      // For Astrology
      birthDetails: {
        date: Date,
        time: String,
        place: {
          city: String,
          state: String,
          country: String,
          coordinates: { latitude: Number, longitude: Number }
        }
      },
      consultationType: String,
      specificQueries: [String],
      
      // For Vastu
      propertyType: String,
      propertyDetails: {
        area: Number,
        rooms: Number,
        floors: Number,
        facing: String
      },
      layoutPlans: [String],
      compassReadings: [String],
      videoTours: [String],
      issues: [String],
      
      // For Manifestation
      manifestationType: String,
      currentSituation: String,
      desiredOutcome: String,
      timeframe: String,
      
      // For Wealth Services
      wealthServiceType: String,
      currentFinancialSituation: String,
      goals: [String],
      businessDetails: mongoose.Schema.Types.Mixed
    },
    
    // Assignment & Processing
    assignedPractitioner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedAt: Date,
    startedAt: Date,
    completedAt: Date,
    deliveryDate: Date,
    
    // Communication
    notes: [String],
    internalNotes: [String],
    clientCommunication: [{
      message: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      timestamp: { type: Date, default: Date.now },
      attachments: [String]
    }],
    
    // Quality Assurance
    qaStatus: {
      type: String,
      enum: ['pending', 'approved', 'revision-needed'],
      default: 'pending'
    },
    qaReviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    qaComments: String,
    
    // Feedback & Rating
    clientRating: Number,
    clientFeedback: String,
    practitionerFeedback: String,
    
    // Reports & Deliverables
    deliverables: [{
      type: String,
      url: String,
      uploadedAt: Date,
      version: Number
    }]
    
  }, { timestamps: true });
  
  // Generate order number before saving
  orderSchema.pre('save', async function(next) {
    if (!this.orderNumber) {
      const count = await this.constructor.countDocuments();
      this.orderNumber = `ORD${Date.now()}${count + 1}`;
    }
    next();
  });
  
  module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

// models/Report.js
const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    reportType: {
      type: String,
      required: true,
      enum: ['energy-reading', 'astrology', 'vastu', 'manifestation', 'wealth', 'calculator', 'assessment']
    },
    
    // Report Content
    title: { type: String, required: true },
    summary: String,
    content: mongoose.Schema.Types.Mixed, // Flexible content structure
    
    // File Information
    pdfUrl: String,
    pdfSize: Number,
    generatedAt: Date,
    version: { type: Number, default: 1 },
    
    // Access & Sharing
    accessLevel: { type: String, enum: ['private', 'shared'], default: 'private' },
    downloadCount: { type: Number, default: 0 },
    lastAccessed: Date,
    expiryDate: Date,
    
    // Metadata
    tags: [String],
    category: String,
    language: { type: String, default: 'en' },
    
    // Analytics
    viewCount: { type: Number, default: 0 },
    printCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 }
    
  }, { timestamps: true });
  
  module.exports = mongoose.model('Report', reportSchema);
  
  // models/Calculator.js
  const calculatorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    calculatorType: {
      type: String,
      required: true,
      enum: ['lagan', 'numerology', 'loshu-grid', 'personality-assessment', 'ikigai']
    },
    
    // Input Data
    inputData: {
      // For Lagan Calculator
      birthDate: Date,
      birthTime: String,
      birthPlace: {
        city: String,
        state: String,
        country: String,
        coordinates: { latitude: Number, longitude: Number }
      },
      
      // For Numerology
      fullName: String,
      
      // For Personality Assessment
      responses: mongoose.Schema.Types.Mixed,
      
      // For Ikigai
      assessmentResponses: mongoose.Schema.Types.Mixed
    },
    
    // Results
    results: mongoose.Schema.Types.Mixed,
    interpretation: String,
    recommendations: [String],
    
    // Report Generation
    reportGenerated: { type: Boolean, default: false },
    reportUrl: String,
    
    // Session Info
    sessionId: String,
    ipAddress: String,
    userAgent: String,
    
    // Analytics
    completionTime: Number, // in seconds
    stepsCompleted: Number,
    totalSteps: Number
    
  }, { timestamps: true });
  
  module.exports = mongoose.model('Calculator', calculatorSchema);
  
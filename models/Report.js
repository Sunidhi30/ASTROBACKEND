const mongoose = require('mongoose');

// models/Report.js
const reportSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  
  // Report Details
  title: { type: String, required: true },
  reportType: { 
    type: String, 
    enum: ['pdf', 'text_answer', 'consultation_notes'], 
    required: true 
  },
  
  // File Info (for PDFs)
  fileInfo: {
    fileName: String,
    fileUrl: String,
    fileSize: Number,
    downloadCount: { type: Number, default: 0 }
  },
  
  // Text Content (for simple answers)
  textContent: String,
  
  // Status
  status: { 
    type: String, 
    enum: ['draft', 'completed', 'delivered'], 
    default: 'draft' 
  },
  
  // Delivery Tracking
  deliveryLog: [{
    method: String, // email, dashboard, whatsapp
    deliveredAt: Date,
    status: String
  }],
  
  // Access Control
  isActive: { type: Boolean, default: true },
  expiryDate: Date,
  
  // Admin Info
  preparedBy: String,
  preparationNotes: String,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
// const reportSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
//     reportType: {
//       type: String,
//       required: true,
//       enum: ['energy-reading', 'astrology', 'vastu', 'manifestation', 'wealth', 'calculator', 'assessment']
//     },
    
//     // Report Content
//     title: { type: String, required: true },
//     summary: String,
//     content: mongoose.Schema.Types.Mixed, // Flexible content structure
    
//     // File Information
//     pdfUrl: String,
//     pdfSize: Number,
//     generatedAt: Date,
//     version: { type: Number, default: 1 },
    
//     // Access & Sharing
//     accessLevel: { type: String, enum: ['private', 'shared'], default: 'private' },
//     downloadCount: { type: Number, default: 0 },
//     lastAccessed: Date,
//     expiryDate: Date,
    
//     // Metadata
//     tags: [String],
//     category: String,
//     language: { type: String, default: 'en' },
    
//     // Analytics
//     viewCount: { type: Number, default: 0 },
//     printCount: { type: Number, default: 0 },
//     shareCount: { type: Number, default: 0 }
    
//   }, { timestamps: true });
  
  module.exports = mongoose.model('Report', reportSchema);
  
 
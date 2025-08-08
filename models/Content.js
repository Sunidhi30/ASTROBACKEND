const mongoose = require('mongoose');

// // models/Content.js
// const contentSchema = new mongoose.Schema({
//     type: {
//       type: String,
//       required: true,
//       enum: ['blog', 'faq', 'page', 'resource', 'testimonial']
//     },
    
//     // Basic Information
//     title: { type: String, required: true },
//     slug: { type: String, unique: true, required: true },
//     content: { type: String, required: true },
//     excerpt: String,
    
//     // SEO
//     metaTitle: String,
//     metaDescription: String,
//     keywords: [String],
    
//     // Media
//     featuredImage: String,
//     images: [String],
//     videos: [String],
    
//     // Organization
//     category: String,
//     tags: [String],
    
//     // Publishing
//     status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
//     publishedAt: Date,
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
//     // Analytics
//     viewCount: { type: Number, default: 0 },
//     shareCount: { type: Number, default: 0 },
//     likeCount: { type: Number, default: 0 },
    
//     // Comments (if enabled)
//     commentsEnabled: { type: Boolean, default: false },
//     comments: [{
//       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       content: String,
//       status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
//       createdAt: { type: Date, default: Date.now }
//     }]
    
//   }, { timestamps: true });
  
//   module.exports = mongoose.model('Content', contentSchema);
// Content Vault Schema (Free PDFs, Guides etc)
const contentSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['wellbeing', 'gratitude', 'peace', 'blogs', 'guides', 'material_program'] 
  },
  
  description: String,
  
  // Content Details
  contentType: { 
    type: String, 
    enum: ['pdf', 'audio', 'video', 'blog'], 
    required: true 
  },
  
  fileInfo: {
    fileName: String,
    fileUrl: String,
    fileSize: Number,
    duration: Number // For audio/video
  },
  
  // Blog Content
  blogContent: String, // Rich text for blogs
  
  // Access Control
  accessType: { 
    type: String, 
    enum: ['free', 'paid', 'material_program_only'], 
    default: 'free' 
  },
  
  // SEO & Display
  tags: [String],
  featured: { type: Boolean, default: false },
  downloadCount: { type: Number, default: 0 },
  
  isActive: { type: Boolean, default: true },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
  module.exports = mongoose.model('Content', contentSchema);

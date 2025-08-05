const mongoose = require('mongoose');

// models/Content.js
const contentSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['blog', 'faq', 'page', 'resource', 'testimonial']
    },
    
    // Basic Information
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    excerpt: String,
    
    // SEO
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    
    // Media
    featuredImage: String,
    images: [String],
    videos: [String],
    
    // Organization
    category: String,
    tags: [String],
    
    // Publishing
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    publishedAt: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    // Analytics
    viewCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    
    // Comments (if enabled)
    commentsEnabled: { type: Boolean, default: false },
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      createdAt: { type: Date, default: Date.now }
    }]
    
  }, { timestamps: true });
  
  module.exports = mongoose.model('Content', contentSchema);
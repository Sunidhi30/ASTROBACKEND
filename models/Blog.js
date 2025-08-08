const blogPostSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    content: { type: String, required: true }, // Rich text content
    
    // SEO
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    
    // Media
    featuredImage: String,
    gallery: [String],
    
    // Organization
    category: { 
      type: String, 
      enum: ['astrology', 'vastu', 'numerology', 'energy', 'manifestation', 'wellness', 'tips'], 
      required: true 
    },
    tags: [String],
    
    // Publishing
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    publishedDate: Date,
    
    // Engagement
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    
    // Author Info
    author: String,
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
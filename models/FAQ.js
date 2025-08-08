// FAQ Schema
const faqSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    
    category: { 
      type: String, 
      enum: ['general', 'services', 'payments', 'reports', 'remedies', 'material_program'], 
      required: true 
    },
    
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    
    // Analytics
    viewCount: { type: Number, default: 0 },
    helpfulVotes: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
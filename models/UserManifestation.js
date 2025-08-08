const userManifestationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    manifestationPortalId: { type: Schema.Types.ObjectId, ref: 'ManifestationPortal' },
    
    // Manifestation Details
    intention: { type: String, required: true },
    category: { type: String, enum: ['wealth', 'love', 'career', 'health', 'spiritual', 'other'] },
    
    ritualsPerformed: [String],
    affirmationsUsed: [String],
    
    // Tracking
    startDate: { type: Date, default: Date.now },
    targetDate: Date,
    
    progress: [{
      date: Date,
      update: String,
      milestone: String,
      energyLevel: { type: Number, min: 1, max: 10 }
    }],
    
    status: { 
      type: String, 
      enum: ['in_progress', 'manifested', 'evolved', 'released'], 
      default: 'in_progress' 
    },
    
    manifestationStory: String, // Success story if manifested
    
    createdAt: { type: Date, default: Date.now }
  });
  
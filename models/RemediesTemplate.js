const remedyTemplateSchema = new Schema({
    name: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['donation', 'gemstone', 'mantra', 'chanting', 'affirmation', 'energy_switch', 'vastu_fix', 'action'],
      required: true 
    },
    
    description: String,
    instructions: { type: String, required: true },
    
    // Timing & Duration
    duration: String, // "21 days", "3 months" etc
    frequency: String, // "Daily", "Weekly" etc
    bestTime: String, // "Morning", "Evening" etc
    
    // Resources
    resources: [{
      type: { type: String, enum: ['pdf', 'audio', 'video', 'link'] },
      title: String,
      url: String
    }],
    
    // Astrological Associations
    planetaryAssociation: [String],
    doshaAssociation: [String],
    chartAspectAssociation: [String],
    
    // Usage Stats
    timesUsed: { type: Number, default: 0 },
    
    isActive: { type: Boolean, default: true },
    
    createdAt: { type: Date, default: Date.now }
  });
  
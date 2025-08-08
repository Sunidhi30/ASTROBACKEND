const manifestationPortalSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: String, // Specific time if applicable
    
    portalType: { 
      type: String, 
      enum: ['new_moon', 'full_moon', 'eclipse', 'planetary_transit', 'special_date'], 
      required: true 
    },
    
    description: String,
    significance: String,
    
    // Manifestation Guidelines
    bestPractices: [String],
    avoidActivities: [String],
    recommendedRituals: [String],
    
    // Astrological Info
    planetaryAlignment: String,
    affectedSigns: [String],
    energyType: String, // "Amplifying", "Clearing", "New Beginnings"
    
    isActive: { type: Boolean, default: true },
    notificationSent: { type: Boolean, default: false },
    
    createdAt: { type: Date, default: Date.now }
  });
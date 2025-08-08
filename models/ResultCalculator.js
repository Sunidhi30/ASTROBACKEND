const calculatorResultSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    calculatorType: { 
      type: String, 
      enum: ['lagna', 'numerology', 'loshu_grid', 'biorhythm', 'compatibility'], 
      required: true 
    },
    
    // Input Data
    inputData: {
      dateOfBirth: Date,
      timeOfBirth: String,
      placeOfBirth: {
        city: String,
        latitude: Number,
        longitude: Number,
        timezone: String
      },
      // For compatibility calculator
      partner: {
        dateOfBirth: Date,
        timeOfBirth: String,
        placeOfBirth: Schema.Types.Mixed
      }
    },
    
    // Calculated Results
    results: {
      // For Lagna Calculator
      ascendant: String,
      ascendantDegree: Number,
      
      // For Numerology Calculator
      lifePathNumber: Number,
      expressionNumber: Number,
      soulUrgeNumber: Number,
      personalityNumber: Number,
      
      // For Loshu Grid
      loshuGrid: [[Number]],
      missingNumbers: [Number],
      repeatingNumbers: [Number],
      
      // Generic results field
      additionalData: Schema.Types.Mixed
    },
    
    // Session Info
    sessionId: String,
    ipAddress: String,
    
    createdAt: { type: Date, default: Date.now }
  });
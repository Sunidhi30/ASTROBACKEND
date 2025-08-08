// Personality Assessment Schema
const personalityAssessmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assessmentType: { 
      type: String, 
      enum: ['personality_traits', 'ikigai', 'communication_style'], 
      required: true 
    },
    
    // Assessment Responses
    responses: [{
      questionId: String,
      question: String,
      answer: Schema.Types.Mixed, // Can be string, number, or array
      score: Number
    }],
    
    // Calculated Results
    results: {
      corePersonalityTraits: [String],
      communicationStyle: String,
      emotionalProcessing: String,
      loveLanguage: String,
      ambitionLevel: String,
      valuesAlignment: String,
      
      // For Ikigai Assessment
      ikigaiResults: {
        whatYouLove: [String],
        whatYoureGoodAt: [String],
        whatWorldNeeds: [String],
        whatYouCanBePaidFor: [String],
        ikigaiSuggestion: String
      },
      
      overallScore: Number,
      recommendations: [String]
    },
    
    // Report Generation
    reportGenerated: { type: Boolean, default: false },
    reportUrl: String,
    
    completedAt: { type: Date, default: Date.now }
  });
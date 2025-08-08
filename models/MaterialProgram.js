// Material Program Clients Schema
const materialClientSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    clientType: { type: String, enum: ['individual', 'business'], required: true },
    
    // Individual Client Data
    individualData: {
      wealthGoals: {
        shortTerm: [String],
        longTerm: [String],
        timeline: String
      },
      currentFinancialStatus: {
        income: Number,
        investments: String,
        debts: String,
        assets: String
      },
      wealthBlocks: [String],
      moneyArchetype: String,
      favorableNumbers: [Number],
      favorableColors: [String],
      completedRituals: [String],
      currentPhase: String // Based on astro + cycles
    },
    
    // Business Client Data
    businessData: {
      companyDetails: {
        name: { type: String },
        industry: String,
        size: String,
        stage: { type: String, enum: ['idea', 'startup', 'established'] },
        website: String,
        socialMedia: Schema.Types.Mixed
      },
      keyPersonnel: [{
        name: String,
        role: String,
        birthDetails: {
          dateOfBirth: Date,
          timeOfBirth: String,
          placeOfBirth: String
        },
        astroData: Schema.Types.Mixed
      }],
      officeDetails: {
        address: String,
        vastuGrid: Schema.Types.Mixed,
        energyScore: Number,
        vastuIssues: [String]
      },
      businessGoals: [String],
      currentChallenges: [String],
      teamAccess: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        role: String,
        accessLevel: { type: String, enum: ['view', 'edit'] }
      }]
    },
    
    // Program Progress
    progress: {
      enrollmentDate: { type: Date, default: Date.now },
      currentLevel: { type: String, default: 'beginner' },
      completedModules: [String],
      nextMilestone: String,
      progressPercentage: { type: Number, default: 0 }
    },
    
    // Wealth Wins & Tracking
    wealthWins: [{
      description: String,
      amount: Number,
      date: Date,
      category: String, // deal_closed, investment_return, income_increase
      connectedRemedy: String
    }],
    
    // Strategy & Consultation
    strategyBriefs: [{
      quarter: String,
      briefContent: String,
      videoUrl: String,
      recommendations: [String],
      uploadedAt: Date
    }],
    
    // Tasks & Checklist (For Business)
    taskChecklist: [{
      taskId: String,
      title: String,
      description: String,
      dueDate: Date,
      status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
      adminComments: String,
      userComments: String,
      completedAt: Date
    }],
    
    isActive: { type: Boolean, default: true },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
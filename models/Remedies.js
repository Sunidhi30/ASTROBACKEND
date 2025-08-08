const userRemedySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    remedyTemplateId: { type: Schema.Types.ObjectId, ref: 'RemedyTemplate' },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' }, // If assigned with an order
    
    // Custom Remedy Details (if not from template)
    customRemedy: {
      name: String,
      category: String,
      instructions: String,
      duration: String,
      frequency: String
    },
    
    // Assignment Details
    assignedBy: String, // Admin name
    assignedDate: { type: Date, default: Date.now },
    startDate: Date,
    expectedCompletionDate: Date,
    
    // Progress Tracking
    progress: {
      status: { 
        type: String, 
        enum: ['assigned', 'started', 'in_progress', 'completed', 'paused', 'discontinued'], 
        default: 'assigned' 
      },
      completionPercentage: { type: Number, default: 0 },
      lastUpdateDate: Date,
      notes: String,
      userFeedback: String
    },
    
    // Reminders
    reminderSettings: {
      enabled: { type: Boolean, default: true },
      frequency: String, // daily, weekly
      time: String, // HH:MM
      methods: [{ type: String, enum: ['email', 'sms', 'whatsapp', 'push'] }]
    },
    
    // Tracking Log
    progressLog: [{
      date: Date,
      status: String,
      notes: String,
      completionPercentage: Number
    }],
    
    isActive: { type: Boolean, default: true },
    
    createdAt: { type: Date, default: Date.now }
  });
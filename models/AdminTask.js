
// Admin Tasks/Reminders Schema (This was incomplete in your original)
const adminTaskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    type: { 
      type: String, 
      enum: ['report_upload', 'pdf_delivery', 'call_followup', 'remedy_check', 'payment_issue', 'client_followup', 'content_creation', 'general'], 
      required: true 
    },
    
    // Related References
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    callId: { type: Schema.Types.ObjectId, ref: 'Call' },
    
    // Priority & Status
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: { type: String, enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
    
    // Scheduling
    dueDate: { type: Date, required: true },
    reminderDate: Date,
    completedDate: Date,
    
    // Assignment
    assignedTo: String, // Admin name/ID
    createdBy: String,
    
    // Notes
    adminNotes: String,
    completionNotes: String,
    
    // Recurrence
    isRecurring: { type: Boolean, default: false },
    recurrencePattern: {
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly'] },
      interval: Number,
      endDate: Date
    },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
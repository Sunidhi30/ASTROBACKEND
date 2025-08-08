
// Calls Schema
const callSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    
    // Call Details
    callType: { 
      type: String, 
      enum: ['consultation', 'addon', 'followup', 'material_strategy'], 
      required: true 
    },
    
    // Scheduling
    scheduledDateTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // In minutes
    timezone: String,
    
    // Call Links
    meetingDetails: {
      platform: { type: String, enum: ['zoom', 'google_meet', 'phone'], default: 'zoom' },
      meetingLink: String,
      meetingId: String,
      passcode: String,
      dialInNumber: String
    },
    
    // Call Status
    status: { 
      type: String, 
      enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'], 
      default: 'scheduled' 
    },
    
    // Reschedule History
    rescheduleHistory: [{
      originalDateTime: Date,
      newDateTime: Date,
      reason: String,
      rescheduledBy: String, // admin or user
      rescheduledAt: Date
    }],
    
    // Call Notes
    callNotes: {
      adminNotes: String, // Private notes for admin
      clientSummary: String, // Shareable summary for client
      actionItems: [String],
      followUpRequired: Boolean,
      followUpDate: Date
    },
    
    // Calendar Integration
    calendarEventId: String,
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
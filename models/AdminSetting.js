// Admin Settings Schema
const adminSettingsSchema = new Schema({
    // Business Hours
    businessHours: {
      timezone: { type: String, default: 'Asia/Kolkata' },
      workingDays: [{ type: Number, min: 0, max: 6 }], // 0 = Sunday
      startTime: String, // HH:MM
      endTime: String,
      breakTime: {
        start: String,
        end: String
      }
    },
    
    // Default Settings
    defaults: {
      reportDeliveryDays: { type: Number, default: 3 },
      callDuration: { type: Number, default: 30 },
      bufferTime: { type: Number, default: 15 },
      autoReminderDays: { type: Number, default: 2 },
      followupDays: { type: Number, default: 7 }
    },
    
    // Notification Settings
    notifications: {
      emailAlerts: { type: Boolean, default: true },
      whatsappAlerts: { type: Boolean, default: true },
      dailyTaskSummary: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: true }
    },
    
    // API Configurations
    apiSettings: {
      razorpayKeyId: String,
      whatsappApiKey: String,
      emailServiceProvider: String,
      smsGateway: String,
      calendarIntegration: String
    },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
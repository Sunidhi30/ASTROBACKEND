// Admin Availability Schema
const availabilitySchema = new Schema({
    adminId: String, // For multi-admin setup in future
    
    // Weekly Schedule
    weeklySchedule: [{
      dayOfWeek: { type: Number, min: 0, max: 6 }, // 0 = Sunday
      timeSlots: [{
        startTime: String, // HH:MM format
        endTime: String,
        isAvailable: { type: Boolean, default: true }
      }]
    }],
    
    // Special Dates (holidays, blocked dates)
    specialDates: [{
      date: Date,
      isAvailable: { type: Boolean, default: false },
      reason: String
    }],
    
    // Booking Rules
    bookingRules: {
      advanceBookingDays: { type: Number, default: 7 }, // How many days in advance
      slotDuration: { type: Number, default: 30 }, // Default slot duration in minutes
      bufferTime: { type: Number, default: 15 }, // Buffer between calls
      maxDailyBookings: { type: Number, default: 8 }
    },
    
    timezone: { type: String, default: 'Asia/Kolkata' },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
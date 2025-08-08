// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   // Basic Information
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, trim: true },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   phone: { type: String},
//   // password: { type: String,  minlength: 6 },
//   password: { type: String, required: true, select: false }, // Add select: false to prevent accidental exposure
//   // Profile Information
//   profilePhoto: { type: String },
//   dateOfBirth: { type: Date },
//   timeOfBirth: { type: String },
//   placeOfBirth: {
//     city: String,
//     state: String,
//     country: String,
//     coordinates: {
//       latitude: Number,
//       longitude: Number
//     }
//   },
//   referralCode: {
//     type: String,
//     unique: true
//   },
//   referredBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   referralEarnings: {
//     type: Number,
//     default: 0
//   },
//   zodiacSign: { type: String },
//   // Account Status
//   isVerified: { type: Boolean, default: false },
//   isActive: { type: Boolean, default: true },
//   role: { type: String, enum: ['user', 'practitioner'], default: 'user' },
//   // Verification
//   emailVerificationToken: String,
//   emailVerificationExpires: Date, 
//   phoneVerificationCode: String,
//   phoneVerificationExpires: Date,
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   // Wallet & Credits
//   walletBalance: { type: Number, default: 0 },
//   totalCredits: { type: Number, default: 0 },
//   usedCredits: { type: Number, default: 0 },
//   // Preferences
//   preferences: {
//     language: { type: String, default: 'en' },
//     timezone: { type: String, default: 'UTC' },
//     notifications: {
//       email: { type: Boolean, default: true },
//       sms: { type: Boolean, default: true },
//       push: { type: Boolean, default: true }
//     },
//     privacySettings: {
//       profileVisibility: { type: String, enum: ['public', 'private'], default: 'private' },
//       dataSharing: { type: Boolean, default: false }
//     }
//   },
//   // Service History
//   serviceHistory: [{
//     serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
//     orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
//     serviceType: String,
//     completedAt: Date,
//     rating: Number,
//     feedback: String
//   }],
//   // Saved Items
//   savedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
//   favoriteServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
//   // Analytics
//   lastLogin: Date,
//   loginCount: { type: Number, default: 0 },
//   ipAddress: String,
//   userAgent: String
  
// }, { timestamps: true });

// // Pre-save middleware to hash password
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },

  dateOfBirth: Date,
  timeOfBirth: String,
  placeOfBirth: {
    city: String,
    state: String,
    country: String,
    latitude: Number,
    longitude: Number,
    timezone: String
  },

  astroData: {
    ascendant: String,
    moonSign: String,
    sunSign: String,
    nakshatra: String,
    currentMahadasha: String,
    currentAntardasha: String,
    doshas: [String],
    yogas: [String],
    manglikStatus: Boolean,
    saadeSatiStatus: String,
    personalityTag: String
  },

  numerologyData: {
    lifePathNumber: Number,
    expressionNumber: Number,
    soulUrgeNumber: Number,
    personalityNumber: Number,
    loshuGrid: [[Number]]
  },

  programs: [{
    programType: { type: String, enum: ['material_individual', 'material_business'] },
    enrollmentDate: Date,
    status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
    goals: [String],
    moneyArchetype: String,
    wealthBlocks: [String],
    favorableNumbers: [Number],
    favorableColors: [String]
  }],

  preferences: {
    language: { type: String, default: 'english' },
    timezone: String,
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true }
    }
  },

  referral: {
    referralCode: { type: String, unique: true },
    referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    referralEarnings: { type: Number, default: 0 },
    totalReferrals: { type: Number, default: 0 }
  },

  userType: { type: String, enum: ['individual', 'business'], default: 'individual' },
  clientTags: [{ type: String, enum: ['new', 'repeat', 'high-value', 'dormant'] }],
  acquisitionChannel: String,

  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },

  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

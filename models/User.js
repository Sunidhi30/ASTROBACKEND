
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  
  // Profile Information
  profilePhoto: { type: String },
  dateOfBirth: { type: Date },
  timeOfBirth: { type: String },
  placeOfBirth: {
    city: String,
    state: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Account Status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  role: { type: String, enum: ['user', 'admin', 'practitioner'], default: 'user' },
  
  // Verification
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  phoneVerificationCode: String,
  phoneVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  // Wallet & Credits
  walletBalance: { type: Number, default: 0 },
  totalCredits: { type: Number, default: 0 },
  usedCredits: { type: Number, default: 0 },
  
  // Preferences
  preferences: {
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    privacySettings: {
      profileVisibility: { type: String, enum: ['public', 'private'], default: 'private' },
      dataSharing: { type: Boolean, default: false }
    }
  },
  
  // Service History
  serviceHistory: [{
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    serviceType: String,
    completedAt: Date,
    rating: Number,
    feedback: String
  }],
  
  // Saved Items
  savedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
  favoriteServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  
  // Analytics
  lastLogin: Date,
  loginCount: { type: Number, default: 0 },
  ipAddress: String,
  userAgent: String
  
}, { timestamps: true });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
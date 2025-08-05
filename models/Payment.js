const mongoose = require('mongoose');

// models/Payment.js
const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    
    // Payment Details
    paymentId: { type: String, required: true, unique: true },
    gateway: { type: String, required: true, enum: ['razorpay', 'stripe', 'payu'] },
    method: { type: String, required: true }, // card, upi, netbanking, wallet
    
    // Amount Details
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    
    // Status
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded']
    },
    
    // Gateway Response
    gatewayResponse: mongoose.Schema.Types.Mixed,
    
    // Refund Information
    refunds: [{
      refundId: String,
      amount: Number,
      reason: String,
      status: String,
      processedAt: Date,
      gatewayResponse: mongoose.Schema.Types.Mixed
    }],
    
    // Metadata
    description: String,
    notes: mongoose.Schema.Types.Mixed,
    
    // Timestamps
    initiatedAt: { type: Date, default: Date.now },
    completedAt: Date,
    failedAt: Date
    
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', paymentSchema);
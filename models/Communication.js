const mongoose = require('mongoose');

// models/Communication.js
const communicationSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['chat', 'email', 'sms', 'whatsapp', 'notification', 'call']
    },
    
    // Participants
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    
    // Content
    subject: String,
    message: { type: String, required: true },
    attachments: [String],
    
    // Status
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read', 'failed'],
      default: 'sent'
    },
    
    // Metadata
    channel: String, // email provider, sms gateway, etc.
    externalId: String, // gateway message ID
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    
    // Tracking
    sentAt: Date,
    deliveredAt: Date,
    readAt: Date,
    
    // Response
    responseRequired: { type: Boolean, default: false },
    respondedAt: Date,
    response: String
    
  }, { timestamps: true });
  
  module.exports = mongoose.model('Communication', communicationSchema);

const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Content
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['order-update', 'payment', 'service', 'system', 'promotional', 'reminder']
  },
  
  // Action
  actionUrl: String,
  actionText: String,
  
  // Status
  status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  
  // Delivery
  channels: [{
    type: String,
    enum: ['in-app', 'email', 'sms', 'push'],
    status: { type: String, enum: ['pending', 'sent', 'delivered', 'failed'] },
    sentAt: Date,
    deliveredAt: Date
  }],
  
  // Metadata
  relatedOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  relatedService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  metadata: mongoose.Schema.Types.Mixed,
  
  // Scheduling
  scheduledFor: Date,
  expiresAt: Date,
  
  // Tracking
  readAt: Date,
  clickedAt: Date
  
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);

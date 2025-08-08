// const mongoose = require('mongoose');

// // models/Communication.js
// const communicationSchema = new mongoose.Schema({
//     type: {
//       type: String,
//       required: true,
//       enum: ['chat', 'email', 'sms', 'whatsapp', 'notification', 'call']
//     },
    
//     // Participants
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    
//     // Content
//     subject: String,
//     message: { type: String, required: true },
//     attachments: [String],
    
//     // Status
//     status: {
//       type: String,
//       enum: ['sent', 'delivered', 'read', 'failed'],
//       default: 'sent'
//     },
    
//     // Metadata
//     channel: String, // email provider, sms gateway, etc.
//     externalId: String, // gateway message ID
//     priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    
//     // Tracking
//     sentAt: Date,
//     deliveredAt: Date,
//     readAt: Date,
    
//     // Response
//     responseRequired: { type: Boolean, default: false },
//     respondedAt: Date,
//     response: String
    
//   }, { timestamps: true });
  
//   module.exports = mongoose.model('Communication', communicationSchema);

// Communication Logs Schema
const communicationLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  
  // Communication Details
  type: { 
    type: String, 
    enum: ['email', 'sms', 'whatsapp', 'push_notification'], 
    required: true 
  },
  
  // Message Details
  subject: String,
  message: { type: String, required: true },
  templateUsed: String,
  
  // Recipient Info
  recipient: {
    email: String,
    phone: String,
    name: String
  },
  
  // Delivery Status
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'failed', 'bounced'], 
    default: 'sent' 
  },
  
  // Gateway Response
  gatewayResponse: Schema.Types.Mixed,
  gatewayMessageId: String,
  
  // Tracking
  openedAt: Date,
  clickedAt: Date,
  
  // Trigger Info
  triggerType: { 
    type: String, 
    enum: ['manual', 'automated', 'scheduled'], 
    default: 'manual' 
  },
  triggerEvent: String, // order_confirmation, pdf_delivery etc
  
  sentAt: { type: Date, default: Date.now }
});

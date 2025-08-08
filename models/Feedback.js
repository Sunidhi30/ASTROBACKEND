// Feedback Schema
const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    
    // Ratings
    overallRating: { type: Number, min: 1, max: 5, required: true },
    serviceRating: { type: Number, min: 1, max: 5 },
    deliveryRating: { type: Number, min: 1, max: 5 },
    
    // Feedback Content
    title: String,
    feedback: String,
    suggestions: String,
    
    // Testimonial Consent
    canUseAsTestimonial: { type: Boolean, default: false },
    testimonialApproved: { type: Boolean, default: false },
    testimonialPublished: { type: Boolean, default: false },
    
    // Admin Response
    adminResponse: String,
    respondedAt: Date,
    
    createdAt: { type: Date, default: Date.now }
  });
  
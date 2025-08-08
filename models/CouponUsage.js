const couponUsageSchema = new Schema({
    couponId: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    
    discountAmount: { type: Number, required: true },
    originalAmount: Number,
    finalAmount: Number,
    
    usedAt: { type: Date, default: Date.now }
  });
  
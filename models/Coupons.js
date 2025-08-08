// Coupons Schema
const couponSchema = new Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    name: { type: String, required: true },
    description: String,
    
    // Discount Details
    discountType: { type: String, enum: ['percentage', 'fixed', 'free_service'], required: true },
    discountValue: { type: Number, required: true }, // Percentage or fixed amount
    
    // Applicability
    applicableServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    applicableCategories: [String],
    minimumOrderValue: { type: Number, default: 0 },
    
    // Usage Limits
    maxUses: Number, // Total uses allowed
    maxUsesPerUser: { type: Number, default: 1 },
    currentUses: { type: Number, default: 0 },
    
    // Validity
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    
    // User Restrictions
    applicableUserTypes: [{ type: String, enum: ['new', 'existing', 'material_program', 'all'] }],
    excludedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
    // Status
    isActive: { type: Boolean, default: true },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true // Ensures unique coupon codes
    },
    discountType: {
      type: String,
      required: true,
      enum: ['percentage', 'fixed_amount', 'free_shipping'] // Allowed discount types
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0 // Enforce non-negative discount values
    },
    minimumOrderAmount: {
      type: Number,
      default: null // Optional minimum order amount for the coupon to apply
    },
    startDate: {
      type: Date,
      required: true,
      default: new Date()
    },
    expiryDate: {
      type: Date,
      required: true
    },
    active: {
      type: Boolean,
      required: true,
      default: true // Default to active state
    }
  },
  { timestamps: true }
)

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema)
export default Coupon

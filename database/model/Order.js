import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    // User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    // User who placed the order
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon'
    },
    // Items ordered (array of subdocuments)
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        size: {
          type: String
        },
        color: {
          type: String
        },
        // Additional item-specific details (optional)
        price: {
          // Can include price at time of order
          type: Number
        },
        discount: {
          // Can include any applied sale price
          type: Number
        }
      }
    ],
    // Shipping and billing information
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true
    },
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true
    },
    // Order status and tracking
    status: {
      type: String,
      required: true,
      // enum: [
      //   'Pending',
      //   'Processing',
      //   'Confirmed',
      //   'Packing',
      //   'Packed',
      //   'Delivering',
      //   'Delivered',
      //   'Canceled',
      //   'Failed'
      // ],
      default: 'Pending'
    },
    statusTimeline: [
      {
        status: {
          type: String,
          // enum: [
          //   'Pending',
          //   'Processing',
          //   'Confirmed',
          //   'Packing',
          //   'Packed',
          //   'Delivering',
          //   'Delivered'
          // ],
          required: true,
          default: 'Pending'
        },
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],
    trackingNumber: {
      type: String
    },

    // Order total and details
    subtotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    },
    // Payment information
    paymentMethod: {
      type: String
    },
    paymentReference: {
      type: String
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default Order

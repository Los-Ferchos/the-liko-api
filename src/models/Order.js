import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    status: {
        type: String,
        enum: ['processed', 'shipped', 'delivered', 'canceled'],
        default: 'processed'
    },
    address: {
        type: String
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
              value: {
                type: Number,
                required: true
              },
              currency: {
                type: String,
                required: true
              }
            }
        }
    ],
    taxPercentage: {
        type: Number,
        default: 0
    },
    totalCost: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
});

const Order = model('Order', orderSchema);
export default Order;
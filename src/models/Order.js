import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    status: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
        },
        unitPrice: {
            type: Number,
        },
        currency: {
            type: String,
        },
    },
    taxPercentage: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    currrency: {
        type: String,
        required: true
    },
})

const Order = model('Order', orderSchema);
export default Order;
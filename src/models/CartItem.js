import { Schema, model } from 'mongoose';

/**
 * @typedef {Object} CartItem
 * @property {string} userId - The user ID associated with the cart item.
 * @property {string} productId - The product ID associated with the cart item.
 * @property {number} quantity - The quantity of the product in the cart item. Should be greater than 0.
 */

/**
 * @classdesc Represents the schema for a cart item in the shopping cart.
 * @class
 * @name CartItemSchema
 * @extends Schema
 */
const cartItemSchema = new Schema({
    userId: { 
        type: String, 
        required: true 
    },
    productId: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    }
});

const CartItem = model('CartItem', cartItemSchema);
export default CartItem;

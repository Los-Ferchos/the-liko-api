import { Schema, model } from 'mongoose';

/* 
  Wish List schema
*/
const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    }],
});

const Wishlist = model('Wishlist', wishlistSchema);

export default Wishlist;

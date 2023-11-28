import { Schema, model } from 'mongoose';

/* 
  Product schema
*/
const productSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['product', 'combo'],
      default: 'produt'
    }, 
    description: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    totalReviews: {
      type: Number,
      required: true
    },
    sells: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
    },
    imgUrl: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory',
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
    },
    details: {
      type: Object,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    availability: {
      type: Boolean,
      default: true
    }
});
  
const Product = model('Product', productSchema);
export default Product;

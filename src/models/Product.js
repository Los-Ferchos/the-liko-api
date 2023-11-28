import { Schema, model } from 'mongoose';

/* 
  Product schema
*/
const productSchema = new Schema({
    name: {
      type: String,
      required: true
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
      required: true
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
      required: true
    },
    drinkMixes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DrinkMix'
      }
    ],
    combos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Combo'
      }
    ],
    availability: {
      type: Boolean,
      default: true
    },
    deleted: {
      type: Boolean,
      default: false
    }
});
  
const Product = model('Product', productSchema);
export default Product;

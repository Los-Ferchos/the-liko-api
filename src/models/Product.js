import { Schema, model } from 'mongoose';

/* 
  Product schema
*/
const productSchema = new Schema({
    name: {
      type: String
    },
    description: {
      type: String
    },
    rating: {
      type: Number
    },
    totalReviews: {
      type: Number
    },
    sells: {
      type: Number
    },
    quantity: {
      type: Number
    },
    imgUrl: {
      type: String
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory'
    },
    price: {
      value: {
        type: Number
      },
      currency: {
        type: String
      }
    },
    details: {
      type: Object
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
    ]
});
  
const Product = model('Product', productSchema);
export default Product;

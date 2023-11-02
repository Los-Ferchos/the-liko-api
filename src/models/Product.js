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
    quantityRate: {
      type: Number
    },
    imgUrl: {
      type: String
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
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
    combo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Combo'
      }
    ]
});
  
const Product = model('Product', productSchema);
export default Product;

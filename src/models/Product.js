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
      default: 'product'
    }, 
    description: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: props => `${props.value} is not a valid positive number for price.`,
      },
    },
    totalReviews: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: props => `${props.value} is not a valid positive number for price.`,
      },
    },
    sells: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: props => `${props.value} is not a valid positive number for price.`,
      },
    },
    quantity: {
      type: Number,
      default: 1,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: props => `${props.value} is not a valid positive number for price.`,
      },
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
        required: true,
        validate: {
          validator: function (value) {
            return value >= 0;
          },
          message: props => `${props.value} is not a valid positive number for price.`,
        },
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
    },
    deleted: {
      type: Boolean,
      default: false
    }
});
  
const Product = model('Product', productSchema);
export default Product;

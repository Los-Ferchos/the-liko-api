import { Schema, model } from 'mongoose';

/**
 * RatingEschema represents the schema for rating details of a product.
 *
 * @typedef {Object} RatingEschema
 * @property {string} productId - The ID of the product.
 * @property {number} rating_1 - The count of rating 1 for the product.
 * @property {number} rating_2 - The count of rating 2 for the product.
 * @property {number} rating_3 - The count of rating 3 for the product.
 * @property {number} rating_4 - The count of rating 4 for the product.
 * @property {number} rating_5 - The count of rating 5 for the product.
 * @property {number} totalRating - The total count of ratings for the product.
 * @property {Date} createdAt - The timestamp when the rating details were created.
 * @property {Date} updatedAt - The timestamp when the rating details were last updated.
 */
const RatingEschema = new Schema({
    productId: { 
      type: String, 
      required: true, 
      unique: true 
  },
    rating_1: { 
        type: Number, 
        required: false, 
        unique: false 
    },
    rating_2: { 
        type: Number, 
        required: false, 
        unique: false 
    },
    rating_3: { 
        type: Number, 
        required: false, 
        unique: false 
    },
    rating_4: { 
        type: Number, 
        required: false, 
        unique: false 
    },
    rating_5: { 
        type: Number, 
        required: false, 
        unique: false 
    },
    totalRating: { 
        type: Number, 
        required: false, 
        unique: false 
    },
  },
  { timestamps: true }
);

  
const RatingDetail = model('RatingDetail', RatingEschema);
export default RatingDetail;
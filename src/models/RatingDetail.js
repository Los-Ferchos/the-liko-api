import { Schema, model } from 'mongoose';

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
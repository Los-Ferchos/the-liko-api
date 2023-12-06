import { Schema, model } from 'mongoose';

const ratingUserSchema = new Schema({

    userId : {
        type: String,
        required: true
      },
  
      productId: {
    type: String,
    required: true
  },

 

    rating : {
        type: Number,
        required: true
    },
});

const RatingUser = model('RatingUser', ratingUserSchema);
export default RatingUser;
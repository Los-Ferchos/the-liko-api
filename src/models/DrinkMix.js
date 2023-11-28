import { Schema, model } from 'mongoose';

/* 
  Drink Mix Schema
*/
const drinkMixSchema = new Schema({
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
  imgUrl: {
    type: String,
    required: true
  },
  ingredients: [
    {
      type: String,
      required: true
    }
  ],
  details: {
    type: Object,
    required: true
  },
  preparationSteps: [
    {
      type: String,
      required: true
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

const DrinkMix = model('DrinkMix', drinkMixSchema);
export default DrinkMix;

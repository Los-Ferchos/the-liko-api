import { Schema, model } from 'mongoose';

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
  videoUrl: {
    type: String,
  },
  elements: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
  ],
  details: {
    type: Object,
    required: true
  },
  preparationSteps: [
    {
        type: String
    }
  ],
  combos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Combo'
    }
  ]
});

const DrinkMix = model('DrinkMix', drinkMixSchema);
export default DrinkMix;

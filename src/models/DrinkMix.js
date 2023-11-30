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
  },
  relatedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const DrinkMix = model('DrinkMix', drinkMixSchema);
export default DrinkMix;

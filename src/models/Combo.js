import { Schema, model } from 'mongoose';

const comboSchema = new Schema({
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
  imgUrl: {
    type: String,
    required: true
  },
  elements: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
  ]
});

const Combo = model('Combo', comboSchema);
export default Combo;

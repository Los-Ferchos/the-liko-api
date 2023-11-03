import { Schema, model } from 'mongoose';

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Subcategory = model('Subcategory', subcategorySchema);
export default Subcategory;

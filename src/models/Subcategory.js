import { Schema, model } from 'mongoose';

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Subcategory = model('Subcategory', subcategorySchema);
export default Subcategory;

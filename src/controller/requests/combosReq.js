import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

/**
 * Adds a combo product with the specified category and optional product items.
 * If the category "Combos" does not exist, it will be created.
 * @param {string} request.body.name - The name of the combo product.
 * @param {string} request.body.description - The description of the combo product.
 * @param {number} request.body.quantity - The quantity of the combo product.
 * @param {string} request.body.imgUrl - The image URL of the combo product.
 * @param {number} request.body.price - The price object of the combo product.
 * @param {Array<string>} request.body.productItems - An array of product item IDs to be added to the combo.
 * @returns {Object} - The added combo product.
 * @throws {Object} - An error object with a message property.
 */
export const addNewCombo = async (request, response) => {
    try {
      let comboCategory = await Category.findOne({ name: { $regex: /combos?/i } });
  
      if (!comboCategory) {
        comboCategory = await Category.create({ name: 'Combos' });
      }
  
      const comboProduct = new Product({ ...request.body, type: 'combo', category: comboCategory._id });
      await comboProduct.save();
      response.status(201).json(comboProduct);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Edits a product combo by its ID.
 * @param {string} request.params.id - The ID of the product combo to edit.
 * @param {Object} request.body - The updated product combo details.
 * @returns {Object} - The edited product combo.
 * @throws {Object} - An error object with a message property.
 */
export const editComboById = async (request, response) => {
    const { id } = request.params;
    try {
      const updatedCombo = await Product.findByIdAndUpdate(id, request.body, { new: true });
      if (!updatedCombo) {
        return response.status(404).json({ error: 'Combo not found' });
      }
      response.status(200).json(updatedCombo);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
}

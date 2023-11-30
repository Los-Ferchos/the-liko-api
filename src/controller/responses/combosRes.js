import Category from "../../models/Category.js";
import Product from "../../models/Product.js";
import { generatePagination } from "../methods/paginate.js";

/**
 * Gets all available combo products.
 * @returns {Object[]} - An array of available combo products with populated items.
 * @throws {Object} - An error object with a message property.
 */
export const getAllAvailableCombos = async (request, response) => {
    try {
      const comboCategory = await Category.findOne({ name: { $regex: /combos?/i } });
  
      if (!comboCategory) {
        return response.status(404).json({ message: 'Combos category not found' });
      }
  
      const comboProducts = await Product.find({
        category: comboCategory._id,
        availability: true,
        deleted: false,
      }).populate('items');
  
      response.status(200).json(comboProducts);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Gets all combos including not avaible.
 * For the admin panel use
 * @returns {Object[]} - An array with not deleted combo products with populated items.
 * @throws {Object} - An error object with a message property.
 */
export const getAllCombos = async (request, response) => {
    const {  page = 1, limit = 6 } = request.query;

    try {
      const comboCategory = await Category.findOne({ name: { $regex: /combos?/i } });
  
      if (!comboCategory) {
        return response.status(404).json({ message: 'Combos category not found' });
      }

      const query = {
        category: comboCategory._id,
        deleted: false,
      }
  
      const comboProducts = await Product.find(query).populate('items');

      const totalProductsCount = await Product.countDocuments(query);
      const pagination = generatePagination(page, limit, totalProductsCount);
  
      response.status(200).json({
        products: comboProducts,
        pagination
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Gets a single combo product by its ID with populated items.
 * @param {string} req.params.id - The ID of the combo product to retrieve.
 * @returns {Object} - The combo product with populated items.
 * @throws {Object} - An error object with a message property.
 */
export const getComboById = async (request, response) => {
    try {
      const comboProductId = request.params.id;
  
      const comboProduct = await Product.findById(comboProductId).populate('items');
  
      if (!comboProduct) {
        return response.status(404).json({ message: 'Combo product not found' });
      }
  
      if (!comboProduct.availability || comboProduct.deleted) {
        return response.status(403).json({ message: 'Cannot retrieve the combo. It is not available or has been deleted.' });
      }
  
      response.status(200).json(comboProduct);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
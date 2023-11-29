import Product from "../../models/Product.js";

/**
 * Adds a combo product with the specified category and optional product items.
 * If the category "Combos" does not exist, it will be created.
 * @param {string} req.body.name - The name of the combo product.
 * @param {string} req.body.description - The description of the combo product.
 * @param {number} req.body.quantity - The quantity of the combo product.
 * @param {string} req.body.imgUrl - The image URL of the combo product.
 * @param {string} req.body.currency - The currency code for the combo product price.
 * @param {number} req.body.price - The price value of the combo product.
 * @param {Array<string>} req.body.productItems - An array of product item IDs to be added to the combo.
 * @returns {Object} - The added combo product.
 * @throws {Object} - An error object with a message property.
 */
export const addNewCombo = async (request, response) => {
    const {
      name,
      description,
      quantity,
      imgUrl,
      currency,
      price,
      items,
    } = request.body;
  
    try {
      let comboCategory = await Category.findOne({ name: { $regex: /combos?/i } });
  
      if (!comboCategory) {
        comboCategory = await Category.create({ name: 'Combos' });
      }
  
      const comboProduct = await Product.create({
        name,
        type: 'combo',
        description,
        quantity,
        imgUrl,
        category: comboCategory._id,
        price: {
          value: price,
          currency,
        },
      });
  
      if (items && items.length > 0) {
        await Product.updateMany(
          { _id: { $in: items } },
          { $push: { items: comboProduct._id } }
        );
      }
  
      response.status(201).json(comboProduct);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Edits a product combo by its ID.
 * @param {string} req.params.id - The ID of the product combo to edit.
 * @param {Object} req.body - The updated product combo details.
 * @param {string} req.body.name - The new name of the product combo.
 * @param {string} req.body.description - The new description of the product combo.
 * @param {number} req.body.quantity - The new quantity of the product combo.
 * @param {string} req.body.imgUrl - The new image URL of the product combo.
 * @param {string} req.body.currency - The new currency code for the product combo price.
 * @param {number} req.body.price - The new price value of the product combo.
 * @param {Array<string>} req.body.items - The updated array of product item IDs.
 * @param {boolean} req.body.availability - The new availability status of the product combo.
 * @param {boolean} req.body.deleted - The new deleted status of the product combo.
 * @returns {Object} - The edited product combo.
 * @throws {Object} - An error object with a message property.
 */
export const editComboById = async (request, response) => {
    const {
      name,
      description,
      quantity,
      imgUrl,
      currency,
      price,
      items,
      availability,
      deleted,
    } = request.body;
  
    try {
      const product = await Product.findById(request.params.id);
  
      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }
  
      product.name = name;
      product.description = description;
      product.quantity = quantity;
      product.imgUrl = imgUrl;
      product.price = {
        value: price,
        currency,
      };
  
      if (items) {
        product.items = items;
      }
  
      if (availability !== undefined) {
        product.availability = availability;
      }
  
      if (deleted !== undefined) {
        product.deleted = deleted;
      }
  
      const editedProduct = await product.save();
  
      response.status(200).json(editedProduct);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Edits the availability of a combo product by its ID.
 * @param {string} req.params.id - The ID of the combo product to edit.
 * @param {boolean} req.body.availability - The new availability status of the combo product.
 * @returns {Object} - The edited combo product.
 * @throws {Object} - An error object with a message property.
 */

export const setComboAvailability = async (request, response) => {
    const { availability } = request.body;
  
    try {
      // Find the combo product by ID
      const comboProduct = await Product.findById(request.params.id);
  
      if (!comboProduct) {
        return response.status(404).json({ message: 'Combo product not found' });
      }
  
      // Update the availability of the combo product
      comboProduct.availability = availability;
  
      // Save the edited combo product
      const editedComboProduct = await comboProduct.save();
  
      response.status(200).json(editedComboProduct);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Edits the deleted status of a combo product by its ID.
 * @param {string} req.params.id - The ID of the combo product to edit.
 * @param {boolean} req.body.deleted - The new deleted status of the combo product.
 * @returns {Object} - The edited combo product.
 * @throws {Object} - An error object with a message property.
 */
export const setComboDeleted = async (request, response) => {
    const { deleted } = request.body;
  
    try {
      // Find the combo product by ID
      const comboProduct = await Product.findById(request.params.id);
  
      if (!comboProduct) {
        return response.status(404).json({ message: 'Combo product not found' });
      }
  
      // Update the deleted status of the combo product
      comboProduct.deleted = deleted;
  
      // Save the edited combo product
      const editedComboProduct = await comboProduct.save();
  
      response.status(200).json(editedComboProduct);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
import Product from '../../models/Product.js';

/**
 * Saves a new Product.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const saveNewProduct = async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

/**
 * Edits an Product by its ID.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const editProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

/**
 * Deletes an Product by its ID.
 * 
 * @param {*} req- The request object.
 * @param {*} res - The response object.
 */
export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

/**
 * Deletes Products with death dates earlier than the current date.
 */
export const deleteDeathProducts = async () => {
	const currentDate = new Date();
	await Product.deleteMany({
		deathDate: { $lt: currentDate }
	});
};

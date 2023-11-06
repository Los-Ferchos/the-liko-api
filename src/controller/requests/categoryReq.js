import Category from "../../models/Category";

/**
 * Saves a new Category.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const saveNewCategory = async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

/**
 * Edits a Category by its ID.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const editCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

/**
 * Deletes a Category by its ID.
 * 
 * @param {*} req- The request object.
 * @param {*} res - The response object.
 */
export const deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
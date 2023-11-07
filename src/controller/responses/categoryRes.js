import Category from "../../models/Category.js";

/**
 * Gets a list of all the categories as a JSON response.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Gets an category by its ID as a JSON response.
 *
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json(category);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };   
import Category from "../../models/Category";

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
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const getCategoryById = async (request, response) => {
    try {
        const category = await Category.findById(request.params.id);
        if (!category) {
            response.status(404).json({ error: 'Category not found' });
        } else {
            response.status(200).json(category);
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
  };   
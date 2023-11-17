import Subcategory from "../../models/Subcategory.js";

/**
 * Gets a list of all the subcategories as a JSON response.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Gets an subcategory by its ID as a JSON response.
 *
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);
        if (!subcategory) {
            res.status(404).json({ error: 'Subcategory not found' });
        } else {
            res.status(200).json(subcategory);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};  

/**
 * Gets a list of subcategories that belong to the category which id is passed as parameter

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getSubcategoriesByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
  
    try {
      const subcategories = await Subcategory.find({ category: categoryId });
      res.status(200).json(subcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
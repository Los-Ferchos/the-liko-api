import Subcategory from "../../models/Subcategory.js";

/**
 * Saves a new Subcategory.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const saveNewSubcategory = async (req, res) => {
    try {
      const newSubcategory = new Subcategory(req.body);
      await newSubcategory.save();
      res.status(201).json(newSubcategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

/**
 * Edits a Subcategory by its ID.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const editSubcategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedSubcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      res.status(200).json(updatedSubcategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

/**
 * Deletes a Subcategory by its ID.
 * 
 * @param {*} req- The request object.
 * @param {*} res - The response object.
 */
export const deleteSubcategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
      if (!deletedSubcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}
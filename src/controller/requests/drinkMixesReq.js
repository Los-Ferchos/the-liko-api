import DrinkMix from "../../models/DrinkMix.js";

/**
 * Adds a new drink mix.
 * @route POST /api/drinkMixes
 * @param {Object} request.body - The details of the new drink mix.
 * @returns {Object} - The added drink mix.
 * @throws {Object} - An error object with a message property.
 */
export const addNewDrinkMix = async (request, response) => {
    try {
        const drinkMix = new DrinkMix(request.body);
        await drinkMix.save();
        response.status(201).json(drinkMix);
    } catch (error) {
        response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Edits a drink mix by its ID.
 * @param {string} request.params.id - The ID of the drink mix to edit.
 * @param {Object} request.body - The updated details of the drink mix.
 * @returns {Object} - The edited drink mix.
 * @throws {Object} - An error object with a message property.
 */
export const editDrinkMixById = async (request, response) => {
    const { id } = request.params;
    try {
      const updatedDrinkMix = await DrinkMix.findByIdAndUpdate(id, request.body, { new: true });
      if (!updatedDrinkMix) {
        return response.status(404).json({ error: 'Drink Mix not found' });
      }
      response.status(200).json(updatedDrinkMix);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
}

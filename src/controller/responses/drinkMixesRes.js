import DrinkMix from "../../models/DrinkMix.js";
import { generatePagination } from "../methods/paginate.js";

/**
 * Gets all available drink mixes.
 * @returns {Object[]} - An array of available drink mixes with populated items.
 * @throws {Object} - An error object with a message property.
 */
export const getAllAvailableDrinkMixes = async (request, response) => {
    try {
      const drinkMixes = await DrinkMix.find({
        availability: true,
        deleted: false,
      });
  
      response.status(200).json(drinkMixes);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Gets all drink mixes including not avaible.
 * For the admin panel use
 * @returns {Object[]} - An array with not deleted drink mixes with populated items.
 * @throws {Object} - An error object with a message property.
 */
export const getAllDrinkMixes = async (request, response) => {
    const {  page = 1, limit = 6 } = request.query;

    try {
      const query = { deleted: false }
      const startIndex = (page - 1) * limit;

      const drinkMixes = await DrinkMix.find(query).limit(limit).skip(startIndex);

      const totalProductsCount = await DrinkMix.countDocuments(query);
      const pagination = generatePagination(page, limit, totalProductsCount);
  
      response.status(200).json({
        products: drinkMixes,
        pagination
      });
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

/**
 * Gets a single drink mix its ID with populated items.
 * @param {string} req.params.id - The ID of the drink mix to retrieve.
 * @returns {Object} - The drink mix with populated items.
 * @throws {Object} - An error object with a message property.
 */
export const getDrinkMixById = async (request, response) => {
    try {
      const drinkMixId = request.params.id;
  
      const drinkMix = await DrinkMix.findById(drinkMixId);
  
      if (!drinkMix) {
        return response.status(404).json({ message: 'Drink mix not found' });
      }
  
      if (!drinkMix.availability || drinkMix.deleted) {
        return response.status(403).json({ message: 'Cannot retrieve the drink mix. It is not available or has been deleted.' });
      }
  
      response.status(200).json(drinkMix);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
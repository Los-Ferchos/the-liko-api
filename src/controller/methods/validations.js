import Product from '../../models/Product.js';
import User from '../../models/User.js';

/**
 * Check if a user exists by ID.
 *
 * @function
 * @async
 * @param {string} userId - The ID of the user to check.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the user exists, and `false` otherwise.
 * @throws {Error} - If an error occurs during the database query.
 */
export const doesUserExistById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return !!user;
    } catch (error) {
        throw new Error('Error checking user existence by ID');
    }
};

/**
 * Check if a product exists and get its quantity.
 *
 * @function
 * @async
 * @param {string} productId - The ID of the product to check.
 * @returns {Object} - Object containing a boolean 'exists' indicating if the product exists
 *                    and 'quantity' with the product quantity if it exists.
 */
export const checkProductExistsAndGetQuantity = async (productId) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            return { exists: false, quantity: 0 };
        }
        return { exists: true, quantity: product.quantity };
    } catch (error) {
        console.error(error);
        return { exists: false, quantity: 0 };
    }
};

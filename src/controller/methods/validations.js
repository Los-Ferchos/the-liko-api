import Product from '../../models/Product.js';
import User from '../../models/User.js';

/**
 * Validate cart item data.
 *
 * @param {string} userId - The user ID associated with the cart item.
 * @param {string} productId - The product ID associated with the cart item.
 * @param {number} quantity - The quantity of the product in the cart item.
 * @returns {Object} - An object with validation results.
 */
export const validateCartItemData = async (userId, productId, quantity) => {
    const errors = [];
    const userExists = await doesUserExistById(userId);
    if (!userExists) {
        errors.push({ field: 'userId', error: 'User not found' });
    }

    const productInfo = await checkProductExistsAndGetQuantity(productId);
    if (!productInfo.exists) {
        errors.push({ field: 'productId', error: 'Product not found' });
    } else if (quantity > productInfo.quantity) {
        errors.push({
            field: 'quantity',
            error: `Product stock: ${productInfo.quantity} is not enough for the requested quantity: ${quantity}`,
            productQuantity: productInfo.quantity,
        });
    }
    
    if (!Number.isInteger(quantity) || quantity < 1) {
        errors.push({ field: 'quantity', error: 'Quantity should be higher than 0' });
    }



    return { errors, productInfo };
};

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
        return false;
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
        return { exists: false, quantity: 0 };
    }
};

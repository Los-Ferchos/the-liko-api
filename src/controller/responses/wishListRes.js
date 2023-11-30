import Wishlist from "../../models/wishlistSchema.js";
import { doesUserExistById, doesProductExistById } from '../methods/validations.js';
import { getProductsWithNewCurrency } from "../methods/changeCurrency.js";

/**
 * Gets the wishlist items for a user.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The wishlist items for the user.
 */
export const getWishlistItems = async (req, res) => {
    const { newCurrency = "USD" } = request.query;
    try {
        const userId = req.params.userId;
        const userExists = await doesUserExistById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ error: 'Wishlist not found for the specified user' });
        }

        for (let i = wishlist.products.length - 1; i >= 0; i--) {
            const productId = wishlist.products[i].productId;
            const productExists = await doesProductExistById(productId);

            if (!productExists) {
                wishlist.products.splice(i, 1);
            }
        }

        await wishlist.save();

        res.status(200).json(getProductsWithNewCurrency(wishlist.products, newCurrency));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
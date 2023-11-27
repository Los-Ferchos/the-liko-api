import Wishlist from "../../models/wishlistSchema.js";
import { doesUserExistById, doesProductExistById } from '../methods/validations.js';

/**
 * Adds a product to the user's wishlist.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The wishlist after adding the product.
 */
export const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const userExists = await doesUserExistById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        const productExists = await doesProductExistById(productId);
        if (!productExists) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (Object.keys(req.body).length > 2) {
            return res.status(400).json({ message: 'Too many parameters in the request' });
        }

        if (error) {
            return res.status(500).json({ error });
        }

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({
                userId,
                products: [{ productId }],
            });
        } else {
            if (!wishlist.products.find(product => product.productId.equals(productId))) {
                wishlist.products.push({ productId });
            } else {
                return res.status(200).json({ message: 'The product already exists in the wish list' });
            }
        }

        await wishlist.save();

        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Deletes a product from the user's wishlist.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The success message after deleting the product.
 */
export const deleteFromWishlist = async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        const userExists = await doesUserExistById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        const productExists = await doesProductExistById(productId);
        if (!productExists) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ error: 'The wishlist was not found for the specified user' });
        }

        const initialProductsCount = wishlist.products.length;

        wishlist.products = wishlist.products.filter(product => !product.productId.equals(productId));
        await wishlist.save();

        const finalProductsCount = wishlist.products.length;

        if (initialProductsCount === finalProductsCount) {
            return res.status(404).json({ error: 'The product was not found in the wish list' });
        }

        res.status(200).json({ message: 'Product removed from wishlist successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Adds multiple products to the user's wishlist.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} A Promise representing the asynchronous operation.
 */
export const addMultipleToWishlist = async (req, res) => {
    try {
        const { userId, wishlistItems } = req.body;
        const userExists = await doesUserExistById(userId);
        
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { updatedWishlistItems, failedToAdd } = await processWishlistItems(userId, wishlistItems);

        const response = {
            updatedWishlistItems,
            failedToAdd,
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Processes wishlist items by checking if products exist and updating the user's wishlist.
 *
 * @param {string} userId - The ID of the user.
 * @param {Array} wishlistItems - An array of objects containing product data for the wishlist.
 * @returns {Promise<Object>} A Promise that resolves to an object containing updated and failed wishlist items.
 */
const processWishlistItems = async (userId, wishlistItems) => {
    const failedToAdd = [];
    const updatedWishlistItems = [];

    const userExists = await doesUserExistById(userId);

    if (!userExists) {
        return { updatedWishlistItems, failedToAdd };
    }

    for (const wishlistItemData of wishlistItems) {
        const { productId } = wishlistItemData;
        
        const productExists = await doesProductExistById(productId);

        if (!productExists) {
            failedToAdd.push({ productId, reason: 'Product not found' });
            continue;
        }

        const existingWishlistItem = await Wishlist.findOne({ userId, 'products.productId': productId });

        if (existingWishlistItem) {
            failedToAdd.push({ productId, reason: 'Product already exists in the wishlist' });
        } else {
            await Wishlist.updateOne({ userId }, { $push: { products: { productId } } }, { upsert: true });
            updatedWishlistItems.push({ productId });
        }
    }

    return { updatedWishlistItems, failedToAdd };
};

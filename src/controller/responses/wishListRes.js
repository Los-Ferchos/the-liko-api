import Wishlist from "../../models/wishlistSchema.js";
import { convertToCurrency } from "../methods/changeCurrency.js";
import { doesUserExistById, doesProductExistById } from '../methods/validations.js';

/**
 * Gets the wishlist items for a user.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Object} The wishlist items for the user.
 */
export const getWishlistItems = async (req, res) => {
    try {
      const { newCurrency = "USD" } = req.query;
      const userId = req.params.userId;
      const userExists = await doesUserExistById(userId);
  
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const wishlist = await Wishlist.findOne({ userId }).populate({
        path: 'products.productId',
        match: {
          deleted: false,
          availability: true
        }
      });
  
      if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist not found for the specified user' });
      }
  
      for (let i = wishlist.products.length - 1; i >= 0; i--) {
        const product = wishlist.products[i].productId;
  
        if (product) {
          const convertedPrice = convertToCurrency(product._doc.price.value, product._doc.price.currency, newCurrency);
  
          wishlist.products[i].productId._doc.price.value = convertedPrice;
          wishlist.products[i].productId._doc.price.currency = newCurrency;
        } else {
          wishlist.products.splice(i, 1);
        }
      }
  
      await wishlist.save();
  
      res.status(200).json(wishlist.products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
import CartItem from "../../models/CartItem.js";
import { doesProductExistById } from '../methods/validations.js';

/**
 * Get all cart items for a specified user, including full product information.
 *
 * @function
 * @async
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {Object} - JSON response with cart items and associated product information.
 * @throws {Object} - JSON response with an error message if an error occurs.
 */
export const getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.find({ userId }).populate('productId');

    if (!cartItems) {
      return res.status(404).json({ error: 'Cart not found for the specified user' });
    }

    for (let i = cartItems.length - 1; i >= 0; i--) {
      const productId = cartItems[i].productId._id;
      const productExists = await doesProductExistById(productId);
      if (!productExists) {
        await CartItem.findByIdAndRemove(cartItems[i]._id);
      }
    }

    const updatedCartItems = await CartItem.find({ userId }).populate('productId');
    const cartItemsWithProductInfo = updatedCartItems.map((cartItem) => {
      const { _id, quantity } = cartItem;

      return {
        cartItemId: _id,
        quantity,
        productInfo: cartItem.productId
      };
    });

    res.status(200).json(cartItemsWithProductInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

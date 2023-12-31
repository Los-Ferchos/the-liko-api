import CartItem from "../../models/CartItem.js";
import Product from "../../models/Product.js";
import { convertToCurrency } from "../methods/changeCurrency.js";
import { doesProductExistById } from '../methods/validations.js';

/**
 * Get all cart items for a specified user, including full product information.
 *
 * @function
 * @async
 * @param {Express.Request} request - Express request object.
 * @param {Express.Response} response - Express response object.
 * @returns {Object} - JSON response with cart items and associated product information.
 * @throws {Object} - JSON response with an error message if an error occurs.
 */
export const getCartItems = async (request, response) => {
  try {
    const userId = request.params.userId;
    const { newCurrency = "USD" } = request.query;
    const cartItems = await CartItem.find({ userId }).populate('productId');

    if (!cartItems) {
      return response.status(404).json({ error: 'Cart not found for the specified user' });
    }

    // Remove invalid cart items
    for (let i = cartItems.length - 1; i >= 0; i--) {
      const productId = cartItems[i].productId;
      const productExists = await doesProductExistById(productId);
      if (!productExists) {
        await CartItem.findByIdAndDelete(cartItems[i]._id);
      }
    }

    const updatedCartItems = await CartItem.find({ userId }).populate('productId');
    const cartItemsWithProductInfo = await Promise.all(updatedCartItems.map(async (cartItem) => {
      const { _id, quantity } = cartItem;

      let minQuantity = 1;
      if (cartItem.productId.type === 'combo') {
        const comboItems = await Product.find({
          _id: { $in: cartItem.productId.items },
        });
        minQuantity = Math.min(...comboItems.map(item => item.quantity || 1));
      }

      return {
        cartItemId: _id,
        quantity,
        productInfo: {
          ...cartItem.productId._doc,
          price: {
            value: convertToCurrency(
              cartItem.productId._doc.price.value, cartItem.productId._doc.price.currency, newCurrency
            ),
            currency: newCurrency
          },
          quantity: minQuantity 
        }
      };
    }));

    response.status(200).json(cartItemsWithProductInfo);
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' + error });
  }
};
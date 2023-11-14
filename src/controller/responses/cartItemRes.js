import CartItem from "../../models/CartItem.js";

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
  
      const cartItemsWithProductInfo = cartItems.map((cartItem) => {
        const { _id, quantity } = cartItem;
        const { name, description, rating, totalReviews, sells, quantity: productQuantity, imgUrl, category, subcategory, price, details, drinkMixes, combos } = cartItem.productId;
  
        return {
          cartItemId: _id,
          quantity,
          productInfo: {
            name,
            description,
            rating,
            totalReviews,
            sells,
            productQuantity,
            imgUrl,
            category,
            subcategory,
            price,
            details,
            drinkMixes,
            combos,
          },
        };
      });
  
      res.status(200).json(cartItemsWithProductInfo);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
import CartItem from '../../models/CartItem.js';

/**
 * Add a new cart item.
 * @param {Express.Request} req - request object.
 * @param {Express.Response} res - response object.
 * @returns {Promise<void>}
 */
export const addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      // Check if the user and product exist
  
      // Check if the cart item already exists
      const existingCartItem = await CartItem.findOne({ userId, productId });
  
      if (existingCartItem) {
        return res.status(400).json({ error: 'Product already in the cart. Use the update method to modify the quantity.' });
      }
  
      const errorMessages = {
        userId: 'User ID is required',
        productId: 'Product ID is required',
        quantity: 'Quantity must be a positive number',
      };
  
      for (const field in errorMessages) {
        if (!req.body[field] || (field === 'quantity' && req.body[field] < 1)) {
          return res.status(400).json({ error: errorMessages[field] });
        }
      }
  
      const newCartItem = new CartItem({
        userId,
        productId,
        quantity,
      });

      await newCartItem.save();
  
      res.status(201).json(newCartItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};   
  
/**
 * Edit the quantity of a product in the user's shopping cart.
 *
 * @function
 * @async
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {Object} - JSON response with the updated cart item.
 * @throws {Object} - JSON response with an error message if an error occurs.
 */
export const editCartItemQuantity = async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      const newQuantity = req.body.quantity;
  
      if (!newQuantity || newQuantity < 1) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }

      const cartItem = await CartItem.findOne({ userId, productId });

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found for the specified user and product' });
      }
  
      cartItem.quantity = newQuantity;
      const updatedCartItem = await cartItem.save();
  
      res.status(200).json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
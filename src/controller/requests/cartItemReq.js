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
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
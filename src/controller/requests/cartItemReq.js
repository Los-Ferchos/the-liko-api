import CartItem from '../../models/CartItem.js';
import { doesUserExistById } from '../methods/validations.js';

/**
 * Add a new cart item.
 * @param {Express.Request} req - request object.
 * @param {Express.Response} res - response object.
 * @returns {Promise<void>}
 */
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const userExists = await doesUserExistById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const productInfo = await checkProductExistsAndGetQuantity(productId);
        if (!productInfo.exists) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (quantity < 1) {
            return res.status(400).json({ error: 'Quantity should be higher than 0' });
        }

        if( quantity > productInfo.quantity){
            return res.status(400).json({ 
                error: `Product stock ${productInfo.quantity} is not enough for the requested quantity`,
                productQuantity: productInfo.quantity 
            });
        }

        const existingCartItem = await CartItem.findOne({ userId, productId });

        if (existingCartItem) {
            return res.status(400).json({ error: 'Product already in the cart. Use the update method to modify the quantity.' });
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

      const productInfo = await checkProductExistsAndGetQuantity(productId);
      if(newQuantity > productInfo.quantity){
        return res.status(400).json({ 
            error: `Product stock ${productInfo.quantity} is not enough for the requested quantity`,
            productQuantity: productInfo.quantity 
        });
      }
  
      if (!Number.isInteger(newQuantity) || newQuantity < 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }
  
      const cartItem = await CartItem.findOne({ userId, productId });

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found for the specified user and product' });
      }
  
      cartItem.quantity = newQuantity;
  
      if (newQuantity === 0) {
        await cartItem.remove();
        return res.status(200).json({ message: 'Cart item deleted successfully' });
      }
  
      const updatedCartItem = await cartItem.save();
      res.status(200).json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
/**
 * Delete a cart item from the user's shopping cart.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the success of the operation.
 * @throws {Object} - JSON response with an error message if an error occurs.
 */
export const deleteCartItem = async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;

      const cartItem = await CartItem.findOne({ userId, productId });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found for the specified user and product' });
      }

      await cartItem.remove();
  
      res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete all cart items for a user from the shopping cart.
 *
 * @function
 * @async
 * @param {Express.Request} req - Express request object.
 * @param {Express.Response} res - Express response object.
 * @returns {Object} - JSON response indicating the success of the operation.
 * @throws {Object} - JSON response with an error message if an error occurs.
 */
export const deleteAllCartItems = async (req, res) => {
    try {
      const userId = req.params.userId;

      await CartItem.deleteMany({ userId });

      const cartItemsExist = await CartItem.exists({ userId });

      if (!cartItemsExist) {
        return res.status(404).json({ error: 'No cart items found for the specified user' });
      }
  
      res.status(200).json({ message: 'All cart items deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
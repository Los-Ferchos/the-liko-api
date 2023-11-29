import CartItem from "../../models/CartItem.js";
import Product from "../../models/Product.js";

/**
 * Decreases the product quantity based on an array of cart item IDs.
 * @param {Array<string>} req.body.cartItemIds - An array of cart item IDs.
 * @returns {Object} - The updated cart items.
 * @throws {Object} - An error object with a message property.
 */
export const decreaseQuantity = async (request, response) => {
    const { cartItemIds } = request.body;
  
    try {
      const cartItems = await CartItem.find({ _id: { $in: cartItemIds } }).populate('productId');
      
      await Promise.all(cartItems.map(async (cartItem) => {
        const { productId, quantity } = cartItem;
  
        if (productId.type === 'combo') {
          const comboItems = await Product.find({
            _id: { $in: productId.items },
          });
        
          let isComboOutStock = false;
          await Promise.all(comboItems.map(async (item) => {
            const updatedQuantity = item.quantity - quantity;
            isComboOutStock = (updatedQuantity === 0 || isComboOutStock);
            await Product.findByIdAndUpdate(item._id, { quantity: updatedQuantity });
          }));

          if(isComboOutStock) Product.findByIdAndUpdate(productId._id, { quantity: 0 })
        } else {
          const updatedQuantity = productId.quantity - quantity;
          await Product.findByIdAndUpdate(productId, { quantity: updatedQuantity });
        }
      }));
  
      const updatedCartItems = await CartItem.find({ _id: { $in: cartItemIds } }).populate('productId');
      response.status(200).json(updatedCartItems);
    } catch (error) {
      response.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
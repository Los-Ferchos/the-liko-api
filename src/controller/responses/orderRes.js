import Order from "../../models/Order";

export const getAllOrders = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cartItems = await CartItem.find({ userId }).populate('productId');
  
      if (!cartItems) {
        return res.status(404).json({ error: 'Cart not found for the specified user' });
      }
  
      const cartItemsWithProductInfo = cartItems.map((cartItem) => {
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

export const getOrderById = async (req, res) => {
    
};

export const getOrderByUserId = async (req, res) => {
    
};
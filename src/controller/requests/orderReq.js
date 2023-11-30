import Order from "../../models/Order.js"
import Product from "../../models/Product.js"

/**
 * Add a new order for the respective user.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const addNewOrder = async (req, res) => {
  try {
    const newOrderData = req.body;
    console.log(newOrderData);
    await decrementStock(newOrderData.items);
    await incrementSells(newOrderData.items);
    console.log('Operations succesfully completed');
    const newOrder = await Order.create(newOrderData);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Decrements the stock quantity of products based on the order items.
 * @param {Array} orderItems - The array of order items.
 * @returns {Promise<void>} - A promise that resolves when the stock is decremented successfully.
 */
const decrementStock = async (orderItems) => {
  try {
    for (const item of orderItems) {
      const productId = item.productId;
      const product = await Product.findById(productId);
      if(product.type === 'combo') {
        for (const comboItem of product.items) {
          console.log('Combo item: ', comboItem);
          const comboProduct = await Product.findById(comboItem);
          comboProduct.quantity -= item.quantity;
          await comboProduct.save();
        }
      }
      product.quantity -= item.quantity;
      await product.save();
      
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * Increments the sells of products based on the order items.
 * @param {Array} orderItems - The array of order items.
 * @returns {Promise<void>} - A promise that resolves when the sells are incremented.
 */
const incrementSells = async (orderItems) => {
  try {
    for (const item of orderItems) {
      const productId = item.productId;
      const product = await Product.findById(productId);
      if(product.type === 'combo') {
        for (const comboItem of product.items) {
          const comboProduct = await Product.findById(comboItem);
          comboProduct.sells += item.quantity;
          await comboProduct.save();
        }
      }

      product.sells += item.quantity;
      await product.save();
      
    }
  } catch (err) {
    console.log(err);
  }
}


export const editOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrderData = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
export const getOrderItems = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order.items);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const updateStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
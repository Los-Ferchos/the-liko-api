import Order from "../../models/Order.js";
import { generatePagination } from "../methods/paginate.js";

/**
 * Mehtod to get all the orders in the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Method to get an existing order with the provided ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the order or an error.
 */
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Mehtod to get all the order of a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the orders of a user or an error.
 */
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { page = 1, limit = 20 } = req.query;

    const orders = await Order.find({ userId }).populate({
        path: 'items.productId',
        model: 'Product',
      }).limit(limit);
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found for this user' });
    }
    const totalProductsCount = await Order.countDocuments({ userId });
    const pagination = generatePagination(page, limit, totalProductsCount);
    res.status(200).json({ orders, pagination });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
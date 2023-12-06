import Order from "../../models/Order.js";
import { generatePagination } from "../methods/paginate.js";

/**
 * Method to get all the orders in the database
 * 
 * @param {*} req - The request object
 * @param {*} res - The response object
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
 * Method to get the order by ID
 * 
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {object} The order with this ID
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
 * Methdo to get all the orders of a specific user.
 * 
 * @param {*} req - The request object
 * @param {*} res - The response object
 * @returns {Object} A list with all the orders of the user
 */
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { page = 1, limit = 20 } = req.query;
    const startIndex = (page - 1) * limit;

    const orders = await Order.find({ userId }).populate({
        path: 'items.productId',
        model: 'Product',
      }).limit(limit).skip(startIndex);
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
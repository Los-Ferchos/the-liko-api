import Product from "../../models/Product.js";
import { generatePagination } from "../methods/methods.js";

/**
 * Gets an product by its ID as a JSON response.
 *
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const getProductById = async (request, response) => {
  try {
      const product = await Product.findById(request.params.id);
      if (!product) {
          response.status(404).json({ error: 'Product not found' });
      } else {
          response.status(200).json(product);
      }
  } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets a list of products as a JSON response using pagination.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllProducts = async (req, res) => {
    const { page = 1, limit = 6, sort='popularity' } = req.query;
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const products = await Product.find().skip(startIndex).limit(limit);
      const totalProductsCount = await Product.countDocuments();
      const pagination = generatePagination(page, limit, totalProductsCount);
  
      res.status(200).json({
        products,
        pagination
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

/**
 * Gets a list of products as a JSON response using pagination by category.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllProductsByCategory = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const { categoryId } = req.params;
  
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const products = await Product.find({ category: categoryId }).skip(startIndex).limit(limit);
      const totalProductsCount = await Product.countDocuments({ category: categoryId });
      const pagination = generatePagination(page, limit, totalProductsCount);
  
      res.status(200).json({
        products,
        pagination
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

/**
 * Gets a list of products as a JSON response using pagination by category and subcategory.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllProductsByCategoryAndSubcategory = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    const { categoryId, subcategoryId } = req.params;
  
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const products = await Product.find({ category: categoryId, subcategory: subcategoryId }).skip(startIndex).limit(limit);
      const totalProductsCount = await Product.countDocuments({ category: categoryId, subcategory: subcategoryId });
      const pagination = generatePagination(page, limit, totalProductsCount);
  
      res.status(200).json({
        products,
        pagination
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

/**
 * Gets a list of products as a JSON response using pagination by subcategory.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllProductsBySubcategory = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const { subcategoryId } = req.params;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const products = await Product.find({ subcategory: subcategoryId }).skip(startIndex).limit(limit);
    const totalProductsCount = await Product.countDocuments({ subcategory: subcategoryId });

    const pagination = {
      total: totalProductsCount,
      limit: limit,
      totalPages: Math.ceil(totalProductsCount / limit),
      page: parseInt(page)
    };

    if (endIndex < totalProductsCount) {
      pagination.next = {
        page: parseInt(page) + 1
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: parseInt(page) - 1
      };
    }

    res.status(200).json({
      products,
      pagination
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
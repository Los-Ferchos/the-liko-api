import Product from "../../models/Product.js";
import { getFiltersQuery } from "../methods/filter.js";
import { generatePagination } from "../methods/methods.js";
import { getSortTypeField } from "../methods/sort.js";

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
    const { page = 1, limit = 6, sort=-5, ft1='0_-1_1', ft2='0_-1_1', ft3='0_-1_1' } = req.query;
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sortWay = getSortTypeField(sort);

      const filters = getFiltersQuery(ft1, ft2, ft3);
      console.log(filters);
      var counter = 0;

      const products = await Product.find(
        {$and: filters}
      ).skip(startIndex)
      .limit(limit)
      .sort({
              [sortWay]: (sort >= 0 ? 1 : -1 ) 
          });

      const totalProductsCount = await Product.countDocuments();
      const pagination = generatePagination(page, limit, totalProductsCount);
  
      res.status(200).json({
        filters,
        products,
        pagination
      });
    } catch (error) {
      res.status(500).json({ 
        error: error.message,
      });
    }
}

/**
 * Gets a list of products as a JSON response using pagination by category.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllProductsByCategory = async (req, res) => {
    const { page = 1, limit = 6, sort=-5, ft1='0_-1_1', ft2='0_-1_1', ft3='0_-1_1' } = req.query;
    const { categoryId } = req.params;
  
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sortWay = getSortTypeField(sort);
      const filters = getFiltersQuery(ft1, ft2, ft3);

      const products = await Product.find({ category: categoryId }, filters).skip(startIndex).limit(limit)
          .sort({
            [sortWay]: (sort >= 0 ? 1 : -1 ) 
          });
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
    const { page = 1, limit = 6, sort=-5, ft1='0_-1_1', ft2='0_-1_1', ft3='0_-1_1' } = req.query;
    const { categoryId, subcategoryId } = req.params;
  
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sortWay = getSortTypeField(sort);
      const filters = getFiltersQuery(ft1, ft2, ft3);
  
      const products = await Product.find({ category: categoryId, subcategory: subcategoryId }, filters).skip(startIndex).limit(limit).sort({
        [sortWay]: (sort >= 0 ? 1 : -1 ) 
      });
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
  const { page = 1, limit = 6, sort=-5, ft1='0_-1_1', ft2='0_-1_1', ft3='0_-1_1' } = req.query;
  const { subcategoryId } = req.params;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    const products = await Product.find({ subcategory: subcategoryId }, filters).skip(startIndex).limit(limit).sort({
      [sortWay]: (sort >= 0 ? 1 : -1 ) 
    });
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
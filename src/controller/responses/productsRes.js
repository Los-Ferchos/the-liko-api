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
  const { page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "" } = req.query;
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    let query = {};
    query.quantity =  {$gte: 1};

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }
    const products = await Product.find(filters.length > 0 ?
      { $and: filters, ...query } : query
    ).skip(startIndex)
      .limit(limit)
      .sort({
        [sortWay]: (sort >= 0 ? 1 : -1)
      });

    const topSellingProducts = await Product.find({
      $and: [
        { name: { $regex: new RegExp(search, 'i') } },
      ]
    })
      .sort({ sells: -1 })
      .limit(5);


    const totalProductsCount = await Product.countDocuments(query);
    const pagination = generatePagination(page, limit, totalProductsCount);

    res.status(200).json({
      products,
      topSellingProducts,
      pagination
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

/**
 * Gets a list of all available products as a JSON response using pagination.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllAvailableProducts = async (req, res) => {
  const { page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "" } = req.query;
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    let query = { availability: true };

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }
    const products = await Product.find(filters.length > 0 ?
      { $and: filters, ...query } : query
    ).skip(startIndex)
      .limit(limit)
      .sort({
        [sortWay]: (sort >= 0 ? 1 : -1)
      });

    const topSellingProducts = await Product.find({
      $and: [
        { name: { $regex: new RegExp(search, 'i') } },
        { availability: true },
      ]
    })
      .sort({ sells: -1 })
      .limit(5);


    const totalProductsCount = await Product.countDocuments(query);
    const pagination = generatePagination(page, limit, totalProductsCount);

    res.status(200).json({
      products,
      topSellingProducts,
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
  const { page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "" } = req.query;
  const { categoryId } = req.params;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    if (filters.length > 0) {
      filters[filters.length] = { category: categoryId }
    }

    let query = { availability: true };
    query.quantity =  {$gte: 1};

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    const topSellingProducts = await Product.find({
      $and: [
        { name: { $regex: new RegExp(search, 'i') } },
      ]
    })
      .sort({ sells: -1 })
      .limit(5);


    const products = await Product.find(filters.length > 0 ? { $and: filters, ...query } : { category: categoryId, ...query }).skip(startIndex).limit(limit)
      .sort({
        [sortWay]: (sort >= 0 ? 1 : -1)
      });
    const totalProductsCount = await Product.countDocuments({ category: categoryId, ...query });
    const pagination = generatePagination(page, limit, totalProductsCount);

    res.status(200).json({
      products,
      topSellingProducts,
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
  const { page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "" } = req.query;
  const { categoryId, subcategoryId } = req.params;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    if (filters.length > 0) {
      filters[filters.length] = { category: categoryId, subcategory: subcategoryId }
    }

    let query = { availability: true };
    query.quantity =  {$gte: 1};

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    const topSellingProducts = await Product.find({
      $and: [
        { name: { $regex: new RegExp(search, 'i') } },
      ]
    })
      .sort({ sells: -1 })
      .limit(5);


    const products = await Product.find(filters.length > 0 ? { $and: filters, ...query } : { category: categoryId, subcategory: subcategoryId, ...query })
      .skip(startIndex).limit(limit).sort({
        [sortWay]: (sort >= 0 ? 1 : -1)
      });
    const totalProductsCount = await Product.countDocuments({ category: categoryId, subcategory: subcategoryId, ...query });
    const pagination = generatePagination(page, limit, totalProductsCount);

    res.status(200).json({
      products,
      topSellingProducts,
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
  const { page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "" } = req.query;
  const { subcategoryId } = req.params;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    if (filters.length > 0) {
      filters[filters.length] = { subcategory: subcategoryId }
    }

    let query = { availability: true};
    query.quantity =  {$gte: 1};

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    const topSellingProducts = await Product.find({
      $and: [
        { name: { $regex: new RegExp(search, 'i') } },
      ]
    })
      .sort({ sells: -1 })
      .limit(5);

    const products = await Product.find(filters.length > 0 ? { $and: filters, ...query } : { subcategory: subcategoryId, ...query }).skip(startIndex).limit(limit).sort({
      [sortWay]: (sort >= 0 ? 1 : -1)
    });
    const totalProductsCount = await Product.countDocuments({ subcategory: subcategoryId });

    const pagination = generatePagination(page, limit, totalProductsCount);

    res.status(200).json({
      products,
      topSellingProducts,
      pagination
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
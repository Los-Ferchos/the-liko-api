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

    const totalProductsCount = await Product.countDocuments(query);
    const pagination = generatePagination(page, limit, totalProductsCount);

    const searchSuggestions = await getSearchSuggestions(search);

    res.status(200).json({
      products,
      pagination,
      searchSuggestions
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

const getSearchSuggestions = async (searchQuery) => {
  try {
    const suggestions = await SearchSuggestion.find({
      term: { $regex: new RegExp(searchQuery, 'i') },
    }).limit(5);

    return suggestions.map((suggestion) => suggestion.term);
  } catch (error) {
    console.error("Error al obtener sugerencias de búsqueda:", error);
    return [];
  }
};

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

    let query = {};

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    const products = await Product.find(filters.length > 0 ? { $and: filters, ...query } : { category: categoryId, ...query }).skip(startIndex).limit(limit)
      .sort({
        [sortWay]: (sort >= 0 ? 1 : -1)
      });
    const totalProductsCount = await Product.countDocuments({ category: categoryId, ...query });
    const pagination = generatePagination(page, limit, totalProductsCount);

    const searchSuggestions = await getSearchSuggestions(search);

    res.status(200).json({
      products,
      pagination,
      searchSuggestions
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

    let query = {};

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    const products = await Product.find(filters.length > 0 ? { $and: filters, ...query } : { category: categoryId, subcategory: subcategoryId, ...query })
      .skip(startIndex).limit(limit).sort({
        [sortWay]: (sort >= 0 ? 1 : -1)
      });
    const totalProductsCount = await Product.countDocuments({ category: categoryId, subcategory: subcategoryId, ...query });
    const pagination = generatePagination(page, limit, totalProductsCount);
    const searchSuggestions = await getSearchSuggestions(search);

    res.status(200).json({
      products,
      pagination,
      SearchSuggestion
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

    let query = {};

    // Agregar filtro de búsqueda por nombre
    if (search) {
      query.name = { $regex: new RegExp(search, 'i') };
    }

    const products = await Product.find(filters.length > 0 ? { $and: filters, ...query } : { subcategory: subcategoryId, ...query }).skip(startIndex).limit(limit).sort({
      [sortWay]: (sort >= 0 ? 1 : -1)
    });
    const totalProductsCount = await Product.countDocuments({ subcategory: subcategoryId });
    const searchSuggestions = await getSearchSuggestions(search);

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
      pagination,
      searchSuggestions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
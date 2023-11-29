import Product from "../../models/Product.js";
import { convertToCurrency, getProductsWithNewCurrency } from "../methods/changeCurrency.js";
import { getFiltersQuery } from "../methods/filter.js";
import { generatePagination } from "../methods/paginate.js";
import { getSortTypeField } from "../methods/sort.js";

/**
 * Gets a product by its ID as a JSON response, with the items or combos array populated.
 *
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const getProductById = async (request, response) => {
  const { newCurrency = "USD" } = request.query;

  try {
    const product = await Product.findById(request.params.id).populate('items');
    
    if (!product) {
      response.status(404).json({ error: 'Product not found' });
    } else {
      const convertedPrice = convertToCurrency(product._doc.price.value, product._doc.price.currency, newCurrency);
      
      let itemsOrCombos = [];
      
      if (product._doc.type === 'combo') {
        itemsOrCombos = product.items.map(item => ({
          ...item._doc,
          price: {
            value: convertToCurrency(item._doc.price.value, item._doc.price.currency, newCurrency),
            currency: newCurrency
          },
        }));
      } else {
        itemsOrCombos = await Product.find({
          type: 'combo',
          items: { $in: [request.params.id] },
        }).populate('items');
      }

      response.status(200).json({
        ...product._doc,
        price: {
          value: convertedPrice,
          currency: newCurrency
        },
        [product._doc.type === 'product' ? 'combos' : 'items']: itemsOrCombos,
      });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Gets a list of products as a JSON response using pagination.

 * @param {*} request - The request object.
 * @param {*} response - The response object.
*/
export const getAllProducts = async (request, response) => {
  const { page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "" } = request.query;
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    let query = { deleted: false };

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
        { deleted: false }
      ]
    })
      .sort({ sells: -1 })
      .limit(5);


    const totalProductsCount = await Product.countDocuments(query);
    const pagination = generatePagination(page, limit, totalProductsCount);

    response.status(200).json({
      products,
      topSellingProducts,
      pagination
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
    });
  }
}

/**
 * Gets a list of all available products as a JSON response using pagination.

 * @param {*} req - The request object.
 * @param {*} res - The response object.
*/
export const getAllAvailableProducts = async (request, response) => {
  const { 
    page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "", newCurrency = "USD"
  } = request.query;
  try {
    const startIndex = (page - 1) * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    let query = { availability: true, deleted: false };
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

    response.status(200).json({
      products: getProductsWithNewCurrency(products, newCurrency),
      topSellingProducts,
      pagination
    });
  } catch (error) {
    response.status(500).json({
      error: error.message,
    });
  }

}

/**
 * Gets a list of products as a JSON response using pagination by category.

 * @param {*} request - The request object.
 * @param {*} response - The response object.
*/
export const getAllProductsByCategory = async (request, response) => {
  const { 
    page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "", newCurrency = "USD"
  } = request.query;
  const { categoryId } = request.params;

  try {
    const startIndex = (page - 1) * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    if (filters.length > 0) {
      filters[filters.length] = { category: categoryId }
    }

    let query = { availability: true, deleted: false };
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


    const products = await Product.find(
      filters.length > 0 ? { $and: filters, ...query } : { category: categoryId, ...query }
    ).skip(startIndex).limit(limit)
      .sort({
        [sortWay]: (sort >= 0 ? 1 : -1)
      });
    const totalProductsCount = await Product.countDocuments({ category: categoryId, ...query });
    const pagination = generatePagination(page, limit, totalProductsCount);

    response.status(200).json({
      products: getProductsWithNewCurrency(products, newCurrency),
      topSellingProducts,
      pagination

    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

/**
 * Gets a list of products as a JSON response using pagination by category and subcategory.

 * @param {*} request - The request object.
 * @param {*} response - The response object.
*/
export const getAllProductsByCategoryAndSubcategory = async (request, response) => {
  const { 
    page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "", newCurrency = "USD"
  } = request.query;
  const { categoryId, subcategoryId } = request.params;

  try {
    const startIndex = (page - 1) * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    if (filters.length > 0) {
      filters[filters.length] = { category: categoryId, subcategory: subcategoryId }
    }

    let query = { availability: true, deleted: false };
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

    response.status(200).json({
      products: getProductsWithNewCurrency(products, newCurrency),
      topSellingProducts,
      pagination
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * Gets a list of products as a JSON response using pagination by subcategory.

 * @param {*} request - The request object.
 * @param {*} response - The response object.
*/
export const getAllProductsBySubcategory = async (request, response) => {
  const { 
    page = 1, limit = 6, sort = -5, ft1 = '0_-1_1', ft2 = '0_-1_1', ft3 = '0_-1_1', search = "", newCurrency = "USD" 
  } = request.query;
  const { subcategoryId } = request.params;

  try {
    const startIndex = (page - 1) * limit;
    const sortWay = getSortTypeField(sort);
    const filters = getFiltersQuery(ft1, ft2, ft3);

    if (filters.length > 0) {
      filters[filters.length] = { subcategory: subcategoryId }
    }

    let query = { availability: true, deleted: false };
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

    response.status(200).json({
      products: getProductsWithNewCurrency(products, newCurrency),
      topSellingProducts,
      pagination
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
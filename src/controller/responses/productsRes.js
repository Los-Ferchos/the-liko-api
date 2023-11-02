import Product from "../../models/Product";

/**
 * Gets an product by its ID as a JSON response.
 *
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const getProductById = async (request, response) => {
	const product = Product.findById(request.params.id);
	response.json(product);
};

/**
 * Gets a list of incidents as a JSON response using pagination by .

 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
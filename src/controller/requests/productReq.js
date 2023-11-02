import Product from '../../models/Product.js';

/**
 * Saves a new Product.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const saveNewProduct = async (request, response) => {
	const product = new Product(request.body);
	try {
		await product.save();
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Edits an Product by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const editProductById = async (request, response) => {
	try {
		await Product.findByIdAndDelete(request.params.id, request.body, {
			new: true
		});
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Deletes an Product by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const deleteProductById = async (request, response) => {
	try {
		await Product.findByIdAndDelete(request.params.id);
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Deletes Products with death dates earlier than the current date.
 */
export const deleteDeathProducts = async () => {
	const currentDate = new Date();
	await Product.deleteMany({
		deathDate: { $lt: currentDate }
	});
};

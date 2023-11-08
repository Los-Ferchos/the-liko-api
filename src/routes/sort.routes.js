import Product from "../../models/Product.js";
import { generatePagination } from "../methods/methods.js";

/**
 * Gets a list of products as a JSON response using pagination and sorts by name alphabetically.
 *
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
export const getAllProductsAlphabeticOrder = async (req, res) => {
    const { page = 1, limit = 6, sort = 'alphabetical' } = req.query;

    // Definir el campo de orden predeterminado (si no se especifica otro)
    let sortField = sort;

    // Si se solicita orden alfabético, cambia el campo de orden
    if (sort === 'alphabetical') {
        sortField = 'name';
    }

    try {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Modifica la consulta para ordenar por el campo apropiado
        const products = await Product.find()
            .skip(startIndex)
            .limit(limit)
            .sort(sortField);

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
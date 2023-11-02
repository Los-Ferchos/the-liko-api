import { Router } from 'express';
import { getAllProducts, getAllProductsByCategory, getAllProductsByCategoryAndSubcategory } from '../controller/responses/productsRes.js';
import { deleteProductById, editProductById, saveNewProduct } from '../controller/requests/productReq.js';

const productRouter = Router();

productRouter.get('/products', getAllProducts);

productRouter.get('/products/category/:categoryId', getAllProductsByCategory);

productRouter.get('/products/category/:categoryId/subcategory/:subcategoryId', getAllProductsByCategoryAndSubcategory);

productRouter.post('/products', saveNewProduct);

productRouter.put('/products/:id', editProductById);

productRouter.delete('/products/:id', deleteProductById);

export default productRouter;

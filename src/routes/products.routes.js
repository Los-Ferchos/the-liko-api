import { Router } from 'express';
import { getAllProducts, getAllAvailableProducts, getAllProductsByCategory, getAllProductsByCategoryAndSubcategory, getAllProductsBySubcategory, getProductById, getAllRatingsDetail, verifyProductPurchased} from '../controller/responses/productsRes.js';
import { deleteProductById, editProductById, saveNewProduct, updateAvailability, getRatingDetail, modifyRatingProduct } from '../controller/requests/productReq.js';

const productRouter = Router();

productRouter.get('/products', getAllAvailableProducts);

productRouter.get('/products/:id', getProductById);

productRouter.get('/informationRatingProducts/:id', getRatingDetail);

productRouter.get('/ratingProducts', getAllRatingsDetail);

productRouter.get('/productPurchased/:userId/:productId', verifyProductPurchased);

productRouter.put('/modifyRatingProduct', modifyRatingProduct);

productRouter.get('/products/category/:categoryId', getAllProductsByCategory);

productRouter.get('/products/category/:categoryId/subcategory/:subcategoryId', getAllProductsByCategoryAndSubcategory);

productRouter.get('/products/subcategory/:subcategoryId', getAllProductsBySubcategory);

productRouter.post('/products', saveNewProduct);

productRouter.put('/products/:id', editProductById);

productRouter.delete('/products/:id', deleteProductById);

productRouter.patch('/products/:id', updateAvailability)

productRouter.get('/all-products', getAllProducts);

export default productRouter;

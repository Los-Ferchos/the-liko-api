import { Router } from 'express';
import { getAllProducts, getAllProductsByCategory, getAllProductsByCategoryAndSubcategory, getAllProductsBySubcategory, getProductById, getAllRatingsDetail, verifyProductPurchased} from '../controller/responses/productsRes.js';
import { deleteProductById, editProductById, saveNewProduct, updateAvailability, saveRatingProduct, getRatingDetail, modifyRatingProduct } from '../controller/requests/productReq.js';

const productRouter = Router();

productRouter.get('/products', getAllProducts);

productRouter.get('/products/:id', getProductById);

productRouter.post('/saveRatingProduct', saveRatingProduct);

productRouter.get('/informationRatingProducts/:id', getRatingDetail);

productRouter.get('/ratingProducts', getAllRatingsDetail);

productRouter.get('/productPurchased/:userId/:productId', verifyProductPurchased);

productRouter.put('/decreaseRatingProduct', modifyRatingProduct);

productRouter.get('/products/category/:categoryId', getAllProductsByCategory);

productRouter.get('/products/category/:categoryId/subcategory/:subcategoryId', getAllProductsByCategoryAndSubcategory);

productRouter.get('/products/subcategory/:subcategoryId', getAllProductsBySubcategory);

productRouter.post('/products', saveNewProduct);

productRouter.put('/products/:id', editProductById);

productRouter.delete('/products/:id', deleteProductById);

productRouter.patch('/products/:id', updateAvailability)


export default productRouter;

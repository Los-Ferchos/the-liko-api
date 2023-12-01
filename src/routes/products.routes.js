import { Router } from 'express';
import { getAllProducts, getAllAvailableProducts, getAllProductsByCategory, getAllProductsByCategoryAndSubcategory, getAllProductsBySubcategory, getProductById, getAllRatingsDetail, verifyProductPurchased, getRatingUser, getRelatedCombos, getRelatedDrinkMixes} from '../controller/responses/productsRes.js';
import { deleteProductById, editProductById, saveNewProduct, updateAvailability, getRatingDetail, modifyRatingProduct, saveUserRating} from '../controller/requests/productReq.js';

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

productRouter.post('/ratingUser', saveUserRating);

productRouter.get('/ratingUser/:userId/:productId', getRatingUser);

productRouter.put('/products/:id', editProductById);

productRouter.delete('/products/:id', deleteProductById);

productRouter.patch('/products/:id', updateAvailability)

productRouter.get('/all-products', getAllProducts);

productRouter.get('/products/:id/related-combos', getRelatedCombos);

productRouter.get('/products/:id/related-drink-mixes', getRelatedDrinkMixes);

export default productRouter;

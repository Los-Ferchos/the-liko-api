import { Router } from 'express';
import { getAllProductsAlphabeticOrder } from '../controller/responses/sortRes.js';
import { getAllProducts } from '../controller/responses/productsRes.js';

const sortedProductRouter = Router();

sortedProductRouter.get('/products/all/alphabetical', getAllProducts);

export default sortedProductRouter;
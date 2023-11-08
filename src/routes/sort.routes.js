import { Router } from 'express';
import { getAllProductsAlphabeticOrder } from '../controller/responses/sortRes.js';

const sortedProductRouter = Router();

sortedProductRouter.get('/products/all/sortAZ', getAllProductsAlphabeticOrder);

export default sortedProductRouter;
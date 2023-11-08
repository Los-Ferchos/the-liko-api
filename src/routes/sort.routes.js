import { Router } from 'express';
import { getAllProductsAlphabeticOrder } from '../controller/responses/sortRes';

const sortedProductRouter = Router();

sortedProductRouter.get('/products/as', getAllProductsAlphabeticOrder);

export default sortedProductRouter;
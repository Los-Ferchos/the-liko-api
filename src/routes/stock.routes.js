import { Router } from 'express';
import { decreaseQuantity } from '../controller/requests/stockReq.js';

const stockRouter = Router();

stockRouter.put('/decrease-stock', decreaseQuantity)

export default stockRouter;
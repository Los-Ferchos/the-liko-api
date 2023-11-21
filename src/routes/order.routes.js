import { Router } from 'express';
import { addNewOrder } from '../controller/requests/orderReq';
import { getOrders } from '../controller/responses/orderRes';

const orderRouter = Router();

orderRouter.get('/orders/:userId', getOrders);
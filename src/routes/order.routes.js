import { Router } from 'express';
import { addNewOrder, editOrder, deleteOrder, getOrderItems, updateStatus } from '../controller/requests/orderReq';
import { getAllOrders, getOrderById, getOrdersByUserId } from '../controller/responses/orderRes';

const orderRouter = Router();

orderRouter.get('/orders', getAllOrders);
orderRouter.get('/orders/:id', getOrderById);
orderRouter.get('/users/:userId/orders', getOrdersByUserId);
orderRouter.post('/orders', addNewOrder);
orderRouter.put('/orders/:id', editOrder);
orderRouter.delete('/orders/:id', deleteOrder);
orderRouter.patch('/orders/:id/status', updateStatus);
orderRouter.get('/orders/:id/items', getOrderItems);
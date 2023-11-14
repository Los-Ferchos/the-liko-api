import { Router } from "express";
import { addToCart } from "../controller/requests/cartItemReq.js";
import { getCartItems } from "../controller/responses/cartItemRes.js";
import { editProductById } from "../controller/requests/productReq.js";

const cartItemsRouter = Router();

cartItemsRouter.post('/cart', addToCart);
cartItemsRouter.get('/cart/:userId', getCartItems);
cartItemsRouter.put('/cart/:userId/:productId', editProductById);

export default cartItemsRouter;
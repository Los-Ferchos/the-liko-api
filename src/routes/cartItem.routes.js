import { Router } from "express";
import { addToCart } from "../controller/requests/cartItemReq.js";
import { getCartItems } from "../controller/responses/cartItemRes.js";

const cartItemsRouter = Router();

cartItemsRouter.post('/cart', addToCart);
cartItemsRouter.get('/cart/:userId', getCartItems);

export default cartItemsRouter;
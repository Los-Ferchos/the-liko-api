import { Router } from "express";
import { addToCart, deleteCartItem, editCartItemQuantity } from "../controller/requests/cartItemReq.js";
import { getCartItems } from "../controller/responses/cartItemRes.js";

const cartItemsRouter = Router();

cartItemsRouter.post('/cart', addToCart);
cartItemsRouter.get('/cart/:userId', getCartItems);
cartItemsRouter.put('/cart/:userId/:productId', editCartItemQuantity);
cartItemsRouter.delete('/cart/:userId/:productId', deleteCartItem);

export default cartItemsRouter;
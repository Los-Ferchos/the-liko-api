import { Router } from "express";
import { addToCart, deleteAllCartItems, deleteCartItem, editCartItemQuantity } from "../controller/requests/cartItemReq.js";
import { getCartItems } from "../controller/responses/cartItemRes.js";

const cartItemsRouter = Router();

cartItemsRouter.post('/cart', addToCart);
cartItemsRouter.get('/cart/:userId', getCartItems);
cartItemsRouter.put('/cart/:userId/:productId', editCartItemQuantity);
cartItemsRouter.delete('/cart/:userId', deleteAllCartItems);
cartItemsRouter.delete('/cart/:userId/:productId', deleteCartItem);

export default cartItemsRouter;
import { Router } from "express";
import { addToCart } from "../controller/requests/cartItemReq.js";

const cartItemsRouter = Router();

cartItemsRouter.post('/cart', addToCart);

export default cartItemsRouter;
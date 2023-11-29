import { Router } from "express";
import { addToWishlist, deleteFromWishlist, addMultipleToWishlist } from "../controller/requests/wishlistReq.js";
import { getWishlistItems } from "../controller/responses/wishListRes.js";

const wishlistRouter = Router();

wishlistRouter.post('/wishlist', addToWishlist);
wishlistRouter.get('/wishlist/:userId', getWishlistItems);
wishlistRouter.delete('/wishlist/:userId/:productId', deleteFromWishlist);
wishlistRouter.post('/multiplewishlist', addMultipleToWishlist);


export default wishlistRouter;

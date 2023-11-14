import { Router } from 'express';
import { getCodeCheckout } from '../controller/requests/checkoutReq.js';

const checkoutRouter = Router();

checkoutRouter.post('/codeCheckout', getCodeCheckout );

export default checkoutRouter;

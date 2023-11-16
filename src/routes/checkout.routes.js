import { Router } from 'express';
import { getCodeCheckout, processPayment } from '../controller/requests/checkoutReq.js';

const checkoutRouter = Router();

checkoutRouter.post('/codeCheckout', getCodeCheckout );
checkoutRouter.post('/confirmCheckout', processPayment );


export default checkoutRouter;

import { Router } from 'express';
import { getCodeCheckout, processPayment, validateUserInformation} from '../controller/requests/checkoutReq.js';

const checkoutRouter = Router();

checkoutRouter.post('/codeCheckout', getCodeCheckout );
checkoutRouter.post('/confirmCheckout', processPayment );
checkoutRouter.post('/validateUserInformation', validateUserInformation );


export default checkoutRouter;

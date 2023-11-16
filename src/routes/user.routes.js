import { Router } from 'express';
import { login, signUp } from '../controller/requests/userReq.js';
import { getQrPayment } from '../controller/responses/qrPaymentRes.js';


const userRouter = Router();

userRouter.post('/login', login );

userRouter.post('/signup', signUp);

userRouter.post('/qr', getQrPayment);


export default userRouter;
import { Router } from 'express';
import { getQrPayment } from '../controller/responses/qrPaymentRes.js';
import { login, signUp, confirmRegister } from '../controller/requests/userReq.js';


const userRouter = Router();

userRouter.post('/login', login );

userRouter.post('/signup', signUp);

userRouter.post('/qr', getQrPayment);

userRouter.post('/confirm_register', confirmRegister)


export default userRouter;
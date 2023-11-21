import { Router } from 'express';
import { login, signUp, confirmRegister } from '../controller/requests/userReq.js';


const userRouter = Router();

userRouter.post('/login', login );

userRouter.post('/signup', signUp)

userRouter.post('/confirm_register', confirmRegister)


export default userRouter;
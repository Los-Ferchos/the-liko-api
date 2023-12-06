import { Router } from 'express';
import { login, signUp, confirmRegister, getUserByToken } from '../controller/requests/userReq.js';


const userRouter = Router();

userRouter.post('/login', login );

userRouter.post('/signup', signUp)

userRouter.post('/confirm_register', confirmRegister)

userRouter.get('/users/:token', getUserByToken)


export default userRouter;
import { Router } from 'express';
import { login } from '../controller/requests/userReq.js';


const userRouter = Router();

userRouter.post('/login', login );


export default userRouter;
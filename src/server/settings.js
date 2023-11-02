import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import indexRouter from '../routes/index.routes.js';
import incidentRouter from '../routes/incident.routes.js';
import userRouter from '../routes/user.routes.js';
import codeRouter from '../routes/verificationCode.routes.js';
import { routeNotFound } from '../controller/responses/indexRes.js';
import sendEmailRoute from '../routes/sendEmail.routes.js';

const serverApp = express();
dotenv.config();

serverApp.set('port', process.env.PORT || 4000);
serverApp.use(cors());
serverApp.use(express.json());
serverApp.use(indexRouter);
serverApp.use(incidentRouter);
serverApp.use(userRouter);
serverApp.use(codeRouter);
serverApp.use(sendEmailRoute)
serverApp.use(routeNotFound);

export default serverApp;

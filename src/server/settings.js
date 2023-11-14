import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import indexRouter from '../routes/index.routes.js';
import productRouter from '../routes/products.routes.js';
import { routeNotFound } from '../controller/responses/indexRes.js';
import categoriesRouter from '../routes/categories.routes.js';
import subcategoriesRouter from '../routes/subcategories.routes.js';
import userRouter from '../routes/user.routes.js';

const serverApp = express();
dotenv.config();

serverApp.set('port', process.env.PORT || 4000);
serverApp.use(cors());
serverApp.use(express.json());
serverApp.use(indexRouter);
serverApp.use(productRouter);
serverApp.use(categoriesRouter);
serverApp.use(subcategoriesRouter);
serverApp.use(userRouter);
serverApp.use(routeNotFound);

export default serverApp;

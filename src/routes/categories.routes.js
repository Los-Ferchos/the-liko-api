import { Router } from 'express';
import { getAllCategories, getCategoryById } from '../controller/responses/categoryRes.js';
import { deleteCategoryById, editCategoryById, saveNewCategory } from '../controller/requests/categoryReq.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getAllCategories);

categoriesRouter.get('/categories/:id', getCategoryById);

categoriesRouter.post('/categories', saveNewCategory);

categoriesRouter.put('/categories/:id', editCategoryById);

categoriesRouter.delete('/categories/:id', deleteCategoryById);

export default categoriesRouter;
import { Router } from 'express';
import { getAllCategories, getCategoryById } from '../controller/responses/categoryRes';
import { deleteCategoryById, editCategoryById, saveNewCategory } from '../controller/requests/categoryReq';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getAllCategories);

categoriesRouter.get('/categories/:id', getCategoryById);

categoriesRouter.post('/categories', saveNewCategory)

categoriesRouter.put('/categories/:id', editCategoryById)

categoriesRouter.delete('/categories/:id', deleteCategoryById);
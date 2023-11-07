import { Router } from 'express';
import { getAllSubcategories, getSubcategoriesByCategory, getSubcategoryById } from '../controller/responses/subcategoryRes.js';
import { deleteSubcategoryById, editSubcategoryById, saveNewSubcategory } from '../controller/requests/subcategoryReq.js';

const subcategoriesRouter = Router();

subcategoriesRouter.get('/subcategories', getAllSubcategories);

subcategoriesRouter.get('/subcategories/:id', getSubcategoryById);

subcategoriesRouter.post('/subcategories', saveNewSubcategory);

subcategoriesRouter.put('/subcategories/:id', editSubcategoryById);

subcategoriesRouter.delete('/subcategories/:id', deleteSubcategoryById);

subcategoriesRouter.get('/categories/:categoryId/subcategories', getSubcategoriesByCategory);

export default subcategoriesRouter;
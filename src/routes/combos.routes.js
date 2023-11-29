import { Router } from 'express';
import { addNewCombo, editComboById, setComboAvailability, setComboDeleted } from '../controller/requests/combosReq.js';
import { getAllAvailableCombos, getAllCombos, getComboById } from '../controller/responses/combosRes.js';

const combosRouter = Router();

combosRouter.get('/combos', getAllAvailableCombos);
combosRouter.get('/all-combos', getAllCombos);
combosRouter.get('/combos/:id', getComboById);
combosRouter.post('/combos', addNewCombo);
combosRouter.put('/combos/:id', editComboById);
combosRouter.put('/combos/edit-availability/:id', setComboAvailability);
combosRouter.put('/combos/edit-deleted/:id', setComboDeleted);

export default combosRouter;
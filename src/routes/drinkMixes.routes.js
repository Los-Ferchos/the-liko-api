import { Router } from 'express';
import { getAllAvailableDrinkMixes, getAllDrinkMixes, getDrinkMixById } from '../controller/responses/drinkMixesRes.js';
import { addNewDrinkMix, editDrinkMixById } from '../controller/requests/drinkMixesReq.js';

const drinkMixesRouer = Router();

drinkMixesRouer.get('/drink-mixes', getAllAvailableDrinkMixes);
drinkMixesRouer.get('/all-drink-mixes', getAllDrinkMixes);
drinkMixesRouer.get('/drink-mixes/:id', getDrinkMixById);
drinkMixesRouer.post('/drink-mixes', addNewDrinkMix);
drinkMixesRouer.put('/drink-mixes/:id', editDrinkMixById);

export default drinkMixesRouer;
import { Router } from 'express';
import { sendInvoice } from '../controller/responses/invoicesRes.js';

const invoiceRouter = Router();

invoiceRouter.post('/send-invoice', sendInvoice );


export default invoiceRouter;
import express from 'express';
import { createContact, getAllContacts, getContactById, deleteContact } from '../controllers/contactcontroller.js';

const router = express.Router();

router.post('/contactus', createContact);
router.get('/allcontacts', getAllContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact); 

export default router;

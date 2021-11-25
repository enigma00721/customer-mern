import express from 'express';
import {getClients,createClient,deleteClient,updateClient,getClientsName} from '../controller/clients'

const router = express.Router();

router.get('/' , getClients);
router.get('/name' , getClientsName);
router.post('/', createClient);
router.patch('/:id',updateClient)
router.delete('/:id',deleteClient)

export default router;
import express from 'express';
import {getContracts,createContract,updateContract,deleteContract} from '../controller/contract'

const router = express.Router();

router.get('/' , getContracts);
router.post('/' , createContract);
router.patch('/:id' , updateContract);
router.delete('/:id' , deleteContract);

export default router;
import express from 'express';
import { getBranch, createBranch, updateBranch, deleteBranch, getBranchOfClient} from '../controller/branch';

const router = express.Router();

router.get('/', getBranch);
router.post('/', createBranch);
router.patch('/:id', updateBranch);
router.delete('/:id', deleteBranch);

router.get('/client/:id' , getBranchOfClient)

export default router;
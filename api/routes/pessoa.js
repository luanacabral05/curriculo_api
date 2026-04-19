import { Router } from 'express';
import * as pessoaController from '../controllers/pessoaController';

const router = Router();

router.get('/', pessoaController.getAll);
router.get('/:pessoaId', pessoaController.getOne);
router.post('/', pessoaController.create);
router.put('/:pessoaId', pessoaController.update);
router.delete('/:pessoaId', pessoaController.remove);

export default router;

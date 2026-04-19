import { Router } from 'express';
import * as formacaoController from '../controllers/formacaoController';

const router = Router();

router.get('/', formacaoController.getAll);
router.get('/:formacaoId', formacaoController.getOne);
router.post('/', formacaoController.create);
router.put('/:formacaoId', formacaoController.update);
router.delete('/:formacaoId', formacaoController.remove);

export default router;
